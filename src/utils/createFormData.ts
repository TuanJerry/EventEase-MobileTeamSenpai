import moment from "moment";
import * as ImageManipulator from "expo-image-manipulator";

import { EventFormData } from "../types/event.d"; // Cập nhật đường dẫn theo cấu trúc dự án

export async function createEventFormData(form: Partial<EventFormData> ): Promise<FormData> {
  const formData = new FormData();

  if(form.title) formData.append("title", form.title);
  if (form.description) formData.append("description", form.description);

  if (form.startTime) {
    formData.append(
      "startTime", moment(form.startTime).format("DD/MM/YYYY HH:mm"));
  }

  if (form.endTime) {
    formData.append("endTime", moment(form.endTime).format("DD/MM/YYYY HH:mm"));
  }

  if(form.capacity) formData.append("participantNumber", form.capacity.toString());
  if(form.location) formData.append("position", form.location);

  if (form.tags) {  
    form.tags.forEach((tag) => {
      formData.append("hashtags", tag);
    });
  }

  if (form.images) {
    for (let index = 0; index < form.images.length; index++) {
      const uri = form.images[index];
      const resized = await resizeImage(uri, index);
      if (resized) {
        formData.append("images", resized as any);
      }
    }
  }

  return formData;
}

async function resizeImage(uri: string, index: number) {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }], // Chỉ resize theo chiều ngang
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );

  return {
    uri: manipResult.uri,
    name: `image_${index}.jpg`,
    type: "image/jpeg",
  };
}