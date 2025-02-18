import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie'
import { FaImage } from "react-icons/fa6";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type EditorType = {
  setEditor: (value: string) => void;
  editor: string;
};

export default function JoditForm({ setEditor, editor }: EditorType) {
  const editorRef = useRef<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
  }, []);

  const handleImageUpload = async (files: FileList) => {
    const token = Cookies.get('authToken');
    const formData = new FormData();
    formData.append('file', files[0]);
    try {
      const { data } = await axios.post("upload-file", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const url = data?.path ? process.env.NEXT_PUBLIC_URL_FILE + data.path : "";
      setImages([...images, url]);
      insertImageToEditor(url);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const insertImageToEditor = (url: string) => {
    if (editorRef.current) {
      const editorInstance = editorRef.current;
      editorInstance.selection.insertHTML(`<img src="${url}" alt="uploaded image" />`);
    }
  };

  return (
    <div className="relative mb-10">
      <label htmlFor="upload" className="sticky gap-1 ml-auto text-white bg-black/35 w-20 p-2 text-sm rounded-full border flex items-center cursor-pointer border-d-50 top-20 z-10 left-10">
        <span>Media</span>
        <i>
          <FaImage />
        </i>
        <input hidden id="upload" title="upload" placeholder="upload" type="file" onChange={(e) => handleImageUpload(e.target.files as FileList)} />
      </label>
      <JoditEditor
        ref={editorRef}
        value={editor}
        onChange={(newContent: string) => setEditor(newContent)}
      />
    </div>
  );
}
