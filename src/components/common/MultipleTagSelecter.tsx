import { enqueueSnackbar } from "notistack";
import AsyncCreatableSelect from "react-select/async-creatable";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { StylesConfig } from "react-select";
import { TagOption } from "../../global/types";

const styles: StylesConfig<TagOption, true> = {};

const loadTags = async (inputValue: string) => {
  const response = await server.get(
    `${ROOT_URL}/${SERVER_URI.GET_TAGS}?keyword=${inputValue}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.records;
};

const createTag = async (inputValue: string) => {
  if (inputValue.length >= 32) {
    enqueueSnackbar("Too long!", { variant: "warning" });
    return;
  }

  let response;
  try {
    response = await server.post(
      `${ROOT_URL}/${SERVER_URI.CREATE_TAG}`,
      {
        keyword: inputValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
  }
  enqueueSnackbar("Added", { variant: "success" });
  return response?.data;
};

export default function MultipleTagSelecter(props: {
  value: any;
  setValue: (newValue: any) => void;
}) {
  return (
    <AsyncCreatableSelect
      isMulti
      defaultOptions
      loadOptions={loadTags}
      onCreateOption={createTag}
      onChange={(newValue) => props.setValue(newValue)}
      value={props.value}
      styles={styles}
    />
  );
}
