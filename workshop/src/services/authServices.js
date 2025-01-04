import axiosDJ from '../config/axiosinstance';

const ENDPOINT = 'auth';

export async function authenticateUser({ username, password }, expiresInMins = 30) {
  try {
    const res = await axiosDJ.post(`${ENDPOINT}/login`, {
      username,
      password,
      expiresInMins,
    });
    return res.data;
  }
  catch (e) {
    console.error('Ops something went wrong', e);
  }
}

export async function getCurrentUser(accessToken) {
  try {
    const res = await axiosDJ.get(`${ENDPOINT}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  }
  catch (e) {
    console.error('Ops something went wrong', e);
  }
}
