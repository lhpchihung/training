import {
  SubmissionData,
  UserData,
  UserSubmission,
} from "../pages/user/personal-information/model";

const GET_USER_DATA_URL = "https://dummyjson.com/c/8965-2d91-4ddb-a6b5";
const SUBMIT_USER_DATA_URL = "https://dummyjson.com/c/9017-7199-4849-834e";
const GET_SUBMISSION_INFOR_URL = "https://dummyjson.com/c/5a22-8836-417c-90c6";
const UPDATE_SUBMISSION_STATUS_URL =
  "https://dummyjson.com/c/a67d-5056-4e62-89ff";
const LOGIN_URL = "https://dummyjson.com/auth/login";
const SIGNUP_URL = "https://dummyjson.com/users/add";
const USER_SUBMISSION = "https://dummyjson.com/c/09b1-4cde-45ee-b732";

export const fetchUserData = async (): Promise<UserData> => {
  try {
    const response = await fetch(GET_USER_DATA_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data: UserData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUserData = async (userData: UserData): Promise<UserData> => {
  try {
    const response = await fetch(SUBMIT_USER_DATA_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    const updatedData: UserData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const fetchSubmissions = async (): Promise<SubmissionData[]> => {
  try {
    const response = await fetch(GET_SUBMISSION_INFOR_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    }
    const data: SubmissionData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

export const updateSubmissionStatus = async (
  id: string,
  action: "approve" | "reject"
): Promise<SubmissionData> => {
  try {
    const response = await fetch(UPDATE_SUBMISSION_STATUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, action }),
    });

    if (!response.ok) {
      throw new Error("Failed to update submission status");
    }

    const updatedSubmission: SubmissionData = await response.json();
    return updatedSubmission;
  } catch (error) {
    console.error("Error updating submission status:", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  accessToken: string;
}> => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, expiresInMins: 30 }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: {
      accessToken: string;
    } = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signUpUser = async (
  email: string,
  password: string
): Promise<{ id: string; email: string }> => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const data: { id: string; email: string } = await response.json();
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const resetPassword = async (
  email: string,
  password: string
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to reset password");
    }

    const data: { success: boolean } = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const fetchUserSubmissions = async (): Promise<UserSubmission[]> => {
  try {
    const response = await fetch(USER_SUBMISSION);
    if (!response.ok) {
      throw new Error("Failed to fetch user submissions");
    }
    const data: UserSubmission[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    throw error;
  }
};
