"use client";

import {useEffect, useState} from "react";
import {CheckCircle, Loader2} from "lucide-react";
import {useFormStatus} from "react-dom";
import Image from "next/image";


import {cn} from "@/lib/utils";
import unsplash from "@/lib/unsplash";
import defaultImages from "@/constants/default-images";
import Link from "next/link";
import FormErrors from "@/components/form/form-errors";

type FormPickerProps = {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({id, errors}: FormPickerProps) {
    const {pending} = useFormStatus();
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImagdId, setSelectedImageId] = useState<string | null>(null);

    useEffect(() => {
        // IIFE to fetch images from Unsplash
        (async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9,
                });

                if (result && result.response) {
                    const unsplashImages = (result.response as Array<Record<string, any>>);
                    setImages(unsplashImages);
                } else {
                    console.error("Failed to fetch images from Unsplash");
                    setImages([]);
                }

            } catch (e) {
                console.error(e);
                setImages(defaultImages);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) {
        return (
            <div className={"p-6 flex items-center justify-center"}>
                <Loader2 className={"animate-spin h-6 w-6 text-sky-700"} />
            </div>
        )
    }


    return (
        <div className={"relative"}>
            <div className={"grid grid-cols-3 gap-2 mb-2"}>
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto",
                        )}
                        onClick={() => {
                          if (pending) return;
                          setSelectedImageId(image.id);
                        }}
                    >
                        <input
                            type="radio"
                            id={id}
                            name={id}
                            className={"hidden"}
                            checked={selectedImagdId === image.id}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.alt_description}|${image.links.html}|${image.user.name}`}
                        />
                        <Image
                            src={image.urls.thumb}
                            alt={image.alt_description}
                            objectFit={"cover"}
                            className={"rounded-sm"}
                            fill
                        />
                        {/* check the selected image */}
                        {selectedImagdId === image.id && (
                            <div className={"absolute inset-0 bg-black/30 flex items-center justify-center rounded-sm"}>
                                <CheckCircle className={"h-6 w-6 text-white"} />
                            </div>
                        )}
                        <Link
                            href={ image.links.html }
                            target={"_blank"}
                            className={"opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"}
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors
                errors={errors}
                id={"image"}
            />
        </div>
    )
}