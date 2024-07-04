import { useState } from "react";
import { useForm } from "react-hook-form";
import "./PollStyles.css";

const REQUIRED_ERR_MSG = "Answer cannot be empty.";
const BANNED_ERR_MSG = "Please, elaborate why you think so.";
const SERVER_ERR_MSG = "Something went wrong. Please try again later.";
const BANNED_OPTIONS = ["yes", "i don't know", "i dont know", "no", "that's fine", "thats fine"];

const isCommentBanned = (comment) => {
  return BANNED_OPTIONS.includes(comment.toLowerCase().trim());
}

export default function Poll() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm();
  const [serverError, setServerError] = useState("");

  const onSubmit = (data) => {
    if (!isCommentBanned(data.content)) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      };

      fetch("/api/replies", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(res => {
          console.log(res.message);
          reset();
          setServerError("");
        })
        .catch(err => {
          console.error(err);
          setServerError(SERVER_ERR_MSG);
        });
    } else {
      setError("content", { type: "banned", message: BANNED_ERR_MSG });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label>
          <b>Is a hot dog a sandwich? Why?</b>
        </label>
        <div>
          <input
            type="text"
            name="content"
            style={{ width: "60%" }}
            {...register("content", {
              required: REQUIRED_ERR_MSG,
              validate: (value) => !isCommentBanned(value) || BANNED_ERR_MSG,
            })}
          />
        </div>
        {errors.content && (
          <p className="errorMsg" >{errors.content.message}</p>
        )}
        {serverError && (
          <p className="errorMsg" > {serverError} </p>
        )}
      </div>
      <div className="form-control">
        <button type="submit" >Save</button>
      </div>
    </form>
  )
}
