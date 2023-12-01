"use client";

import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import {useFormStatus} from "react-dom";

import {cn} from "@/lib/utils";
import unsplash from "@/lib/unsplash";
import Image from "next/image";

type FormPickerProps = {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({id, errors}: FormPickerProps) {
    const {pending} = useFormStatus();
    const [images, setImages] = useState<Array<Record<string, any>>>([]);
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
                setImages([]);
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
                        <Image
                            src={image.urls.thumb}
                            alt={"unsplash"}
                            objectFit={"cover"}
                            className={"rounded-sm"}
                            fill
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}