import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";

import { AxiosHttpClient } from "./axios-http-client";

describe("AxiosHttpClient", () => {
  let mock: AxiosMockAdapter;
  let httpClient: AxiosHttpClient;
  let mockGetToken: Mock;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);

    // Mock da função getToken que retorna um token
    mockGetToken = vi.fn().mockReturnValue("mocked-token");

    // Instanciando o HttpClient com o mock do getToken
    httpClient = new AxiosHttpClient(
      {
        baseURL: "https://api.example.com", // Usando o valor padrão
        timeout: 10000,
      },
      mockGetToken,
    );
  });

  afterEach(() => {
    // Reseta o mock após cada teste
    mock.reset();
  });

  it("should be able to perform a GET request with the Authorization header", async () => {
    const responseData = { data: "some data" };

    // Configura o mock para responder com sucesso
    mock.onGet("/test").reply(200, responseData);

    // Chama o método GET
    const result = await httpClient.get("/test");

    // Verifica se o resultado está correto
    expect(result).toEqual(responseData);

    // Verifica se o cabeçalho Authorization foi corretamente adicionado
    const request = mock.history.get[0]; // A primeira requisição GET
    expect(request.headers!["Authorization"]).toBe("Bearer mocked-token");
  });

  it("should be able to perform a POST request with the Authorization header", async () => {
    const postData = { name: "John" };
    const responseData = { id: 1, ...postData };

    mock.onPost("/test", postData).reply(201, responseData);

    const result = await httpClient.post("/test", postData);

    expect(result).toEqual(responseData);

    const request = mock.history.post[0]; // A primeira requisição POST
    expect(request.headers!["Authorization"]).toBe("Bearer mocked-token");
  });

  it("should be able to perform a PUT request with the Authorization header", async () => {
    const putData = { name: "Jane" };
    const responseData = { id: 1, ...putData };

    // Configura o mock para responder com sucesso
    mock.onPut("/test/1", putData).reply(200, responseData);

    // Chama o método PUT
    const result = await httpClient.put("/test/1", putData);

    // Verifica se o resultado está correto
    expect(result).toEqual(responseData);

    // Verifica se o cabeçalho Authorization foi corretamente adicionado
    const request = mock.history.put[0]; // A primeira requisição PUT
    expect(request.headers!["Authorization"]).toBe("Bearer mocked-token");
  });

  it("should be able to perform a DELETE request with the Authorization header", async () => {
    const responseData = { message: "Deleted successfully" };

    // Configura o mock para responder com sucesso
    mock.onDelete("/test/1").reply(200, responseData);

    // Chama o método DELETE
    const result = await httpClient.delete("/test/1");

    // Verifica se o resultado está correto
    expect(result).toEqual(responseData);

    // Verifica se o cabeçalho Authorization foi corretamente adicionado
    const request = mock.history.delete[0]; // A primeira requisição DELETE
    expect(request.headers!["Authorization"]).toBe("Bearer mocked-token");
  });

  it("should handle errors correctly for GET request", async () => {
    const errorMessage = "Request failed with status code 404";

    // Configura o mock para responder com erro
    mock.onGet("/test").reply(404);

    // Verifica se a função lança um erro
    await expect(httpClient.get("/test")).rejects.toThrowError(errorMessage);
  });

  it("should handle errors correctly for POST request", async () => {
    const postData = { name: "John" };
    const errorMessage = "Request failed with status code 500";

    // Configura o mock para responder com erro
    mock.onPost("/test", postData).reply(500);

    // Verifica se a função lança um erro
    await expect(httpClient.post("/test", postData)).rejects.toThrowError(
      errorMessage,
    );
  });

  it("should not add Authorization header if no token is returned", async () => {
    // Mock para o getToken retornar null
    mockGetToken.mockReturnValueOnce(null);

    const responseData = { data: "some data" };

    // Configura o mock para responder com sucesso
    mock.onGet("/test").reply(200, responseData);

    // Chama o método GET
    const result = await httpClient.get("/test");

    // Verifica se o resultado está correto
    expect(result).toEqual(responseData);

    // Verifica que o cabeçalho Authorization não foi adicionado
    const request = mock.history.get[0]; // A primeira requisição GET
    expect(request.headers!["Authorization"]).toBeUndefined();
  });
});
