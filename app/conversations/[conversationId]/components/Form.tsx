'use client';

import { 
  HiPaperAirplane, 
  HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const Form = () => {

  //Pull details
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  //Using for sending messages
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    })
  }

  //Using for sending photos
  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    })
  }

  return ( 
    <div 
      className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      {/* For uploading  using cloudinary */}
      <CldUploadButton 
        options={{ maxFiles: 5 }} 
        onUpload={handleUpload} 
        uploadPreset="ccoyllks"
      >
        {/* Photo icon */}
        <MdOutlineAddPhotoAlternate size={30} className="text-sky-500" />

      </CldUploadButton>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        {/* Message */}
        <MessageInput 
          id="message" 
          register={register} 
          errors={errors} 
          required 
          placeholder="Typing..."
        />

        {/*Send Button */}
        <button 
          type="submit" 
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
            
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>
      </form>
    </div>
  );
}
 
export default Form;