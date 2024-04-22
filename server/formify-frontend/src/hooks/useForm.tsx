import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export type Form = {
  id: number;
  name: string;
  slug: string;
  description: string;
  limit_one_response: number;
  creator_id: number;
}[];

export default function useForm() {
  const [formData, setFormData] = useState<Form | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);
    const token = user && parsedUser.accessToken;

    if (token) {
      axiosInstance
        .get("v1/forms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFormData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return formData;
}
