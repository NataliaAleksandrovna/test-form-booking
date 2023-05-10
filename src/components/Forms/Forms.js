import React, { useMemo } from "react";
import styles from "./Forms.module.css";
import { v1 } from "uuid";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../Error/Error.message";

const Forms = () => {
  const selectValues = useMemo(
    () => ({
      towers: ["A", "Б"],
      floors: Array(25)
        .fill(3)
        .map((el, i) => el + i),
      meetingRooms: Array(10)
        .fill(1)
        .map((el, i) => el + i),
    }),
    []
  );
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const sendForm = (data) => {
    console.log(JSON.stringify(data));
    reset();
    alert(
      `Вы забронировали переговорную на имя ${data.nameValue} башня ${
        data.towersValue
      } этаж ${data.floorsValue} комната № ${
        data.meetingRoomsValue
      } c ${new Date(data.dateTimeBeginning).toLocaleString()} по ${new Date(
        data.dateTimeEnding
      ).toLocaleString()}`
    );
  };
  const clearForm = () => {
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(sendForm)}>
      <div className={styles.formInput}>
        <input
          {...register("nameValue", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
          })}
          id={v1()}
          type="text"
          placeholder="Введите ФИО"
        />
        <ErrorMessage error={errors?.nameValue?.message} />
      </div>
      <div className={styles.formInput}>
        <label> Выберите башню</label>
        <select {...register("towersValue")} id={v1()}>
          {selectValues.towers.map((tower, i) => {
            return (
              <option key={i} value={tower}>
                {tower}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.formInput}>
        <label> Выберите этаж</label>
        <select name="floors" {...register("floorsValue")}>
          {selectValues.floors.map((floor, i) => {
            return (
              <option id={v1()} key={i} value={floor}>
                {floor}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.formInput}>
        <label> Выберите номер переговорной</label>
        <select
          {...register("meetingRoomsValue", {
            required: "meetingRooms is required",
          })}
          id={v1()}
        >
          {selectValues.meetingRooms.map((room, i) => {
            return (
              <option id={v1()} key={i} value={room}>
                {room}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.formInput}>
        <label> Выберите время начала</label>
        <input
          type="datetime-local"
          {...register("dateTimeBeginning", {
            required: "дата обязательна к заполнению",
            validate: {
              positive: (dateTimeBeginning) =>
                new Date(dateTimeBeginning).getTime() >=
                  new Date().getTime() + 1800000 || "введите дату корректно",
            },
          })}
          id={v1()}
        />
        <ErrorMessage error={errors?.dateTimeBeginning?.message} />
      </div>
      <div className={styles.formInput}>
        <label> Выберите время окончания</label>
        <input
          type="datetime-local"
          {...register("dateTimeEnding", {
            required: "дата обязательна к заполнению",
            validate: (dateTimeEnding) =>
              new Date(dateTimeEnding).getTime() >=
                new Date(getValues("dateTimeBeginning")).getTime() + 1800000 ||
              "введите дату корректно",
          })}
          id={v1()}
        />
        <ErrorMessage error={errors?.dateTimeEnding?.message} />
      </div>
      <div className={styles.formInput}>
        <textarea
          placeholder="дополнительные пожелания"
          {...register("commentsValue")}
          id={v1()}
        ></textarea>
      </div>
      <div className={styles.formBtn}>
        <button className="btn" disabled={!isValid}>
          Отправить
        </button>

        <button className="btn" onClick={() => clearForm()}>
          Очистить
        </button>
      </div>
    </form>
  );
};
export default React.memo(Forms);
