import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./EventForm.style";

type Props = {
  startTime: Date | undefined;
  endTime: Date | undefined;
  setStartTime: (date: Date) => void;
  setEndTime: (date: Date) => void;
};

export default function DateTimePickerGroup({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}: Props) {
  const [startInput, setStartInput] = useState(
    startTime ? formatDate(startTime) : ""
  );
  const [endInput, setEndInput] = useState(endTime ? formatDate(endTime) : "");
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");

  const handleStartBlur = () => {
    const parsed = parseDate(startInput);
    if (parsed) {
      setStartTime(parsed);
      setStartError("");
    } else {
      setStartError("Sai định dạng. Dạng đúng: dd/MM/yyyy HH:mm");
    }
  };

  const handleEndBlur = () => {
    const parsed = parseDate(endInput);
    if (parsed) {
      setEndTime(parsed);
      setEndError("");
    } else {
      setEndError("Sai định dạng. Dạng đúng: dd/MM/yyyy HH:mm");
    }
  };

  return (
    <View style={styles.row}>
      <View style={styles.half}>
        <Text style={styles.label}>Thời gian bắt đầu</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/MM/yyyy HH:mm:ss"
          value={startInput}
          onChangeText={setStartInput}
          onBlur={handleStartBlur}
        />
        {startError ? (
          <Text style={{ color: "red", fontSize: 12 }}>{startError}</Text>
        ) : null}
      </View>

      <View style={styles.half}>
        <Text style={styles.label}>Thời gian kết thúc</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/MM/yyyy HH:mm:ss"
          value={endInput}
          onChangeText={setEndInput}
          onBlur={handleEndBlur}
        />
        {endError ? (
          <Text style={{ color: "red", fontSize: 12 }}>{endError}</Text>
        ) : null}
      </View>
    </View>
  );
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${dd}/${MM}/${yyyy} ${HH}:${mm}:${ss}`;
}

function parseDate(text: string): Date | null {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;
  const match = text.match(regex);
  if (!match) return null;

  const [, dd, MM, yyyy, HH, mm, ss] = match.map(Number);
  const date = new Date(yyyy, MM - 1, dd, HH, mm, ss);
  return isNaN(date.getTime()) ? null : date;
}
