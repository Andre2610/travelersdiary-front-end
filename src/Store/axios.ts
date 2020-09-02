import axios from "axios";
import { apiUrl } from "../config/constants";

// const instance = mockAxios.create({
//   baseURL: apiUrl,
// });

// export default instance;

// const mockAxios = jest.genMockFromModule("axios");

// // this is the key to fix the axios.create() undefined error!
// mockAxios.create = jest.fn(() => mockAxios);

// export default mockAxios;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

export default mockedAxios;
