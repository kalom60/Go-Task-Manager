const BASE_URL: string = "http://localhost:8080";

const isPlainObject = (value: unknown) => value?.constructor === Object;

class ResponseError extends Error {
  response: Response;
  status: number;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
    this.status = res.status;
  }
}

export async function myFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  refreshFlag?: boolean
): Promise<Response> {
  let initOptions = init;

  if (initOptions?.body) {
    if (Array.isArray(initOptions.body) || isPlainObject(initOptions.body)) {
      initOptions = {
        ...initOptions,
        body: JSON.stringify(initOptions.body),
      };
    }
  }

  if (refreshFlag === true) {
    initOptions = {
      ...initOptions,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
  } else {
    initOptions = {
      ...initOptions,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      credentials: "include",
    };
  }

  const res = await fetch(input, initOptions);
  if (!res.ok) {
    throw new ResponseError("Bad response", res);
  }
  return res;
}

export function handlerError(err: unknown) {
  if (err instanceof ResponseError) {
    const error = {
      status: err.status,
      message: err.message,
    };

    switch (err.response.status) {
      case 400:
        throw error;
        break;
      case 401:
        throw error;
        break;
      case 404:
        throw error;
        break;
      case 500:
        throw error;
        break;
      default:
        throw error;
    }
  }
  throw new Error("Unkown fetch error");
}

export const post = async () => {};

export const get = async () => {
  try {
    const res = await myFetch(`${BASE_URL}/todo`, { method: "GET" });
    const data = await res.json();
    return data;
  } catch (err) {
    handlerError(err);
    return;
  }
};

export const put = () => {};

export const patch = () => {};

export const deleteTodo = () => {};

export const refreshToken = async () => {
  try {
    const res = await myFetch(
      `${BASE_URL}/refreshToken`,
      { method: "POST" },
      true
    );
    const data = await res.json();
    localStorage.setItem("access", data.token);
    return;
  } catch (err) {
    if (err instanceof ResponseError) {
      if (err.response.status === 401) {
        localStorage.removeItem("access");
      }
    }
    return;
  }
};
