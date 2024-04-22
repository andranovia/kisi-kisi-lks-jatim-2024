import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

type FormDetail = {
  id: number;
  name: string;
  slug: string;
  description: string;
  limit_one_response: number;
  creator_id: number;
  allowed_domains: string;
  questions: {
    id: number;
    name: string;
    choice_type: string;
    is_required: number;
    choices: string;
  }[];
};

export default function useFormDetail(slug: string) {
  const [formDetailData, setFormDetailData] = useState<FormDetail | undefined>(
    undefined
  );
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);
    const token = user && parsedUser.accessToken;

    if (token) {
      axiosInstance
        .get(`v1/forms/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFormDetailData(response.data.form);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [slug]);

  return formDetailData;
}
