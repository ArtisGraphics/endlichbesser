"use client";
import React, { useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import Papa from "papaparse";
import {
  Button,
  Callout,
  Flex,
  Heading,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import {
  ArchiveIcon,
  CopyIcon,
  DownloadIcon,
  FilePlusIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";

export default function FileConverter() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [convertedData, setConvertedData] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("");

  useEffect(() => {
    if (file?.name.endsWith(".csv")) {
      setTargetFormat("json");
      return;
    }
    if (file?.name.endsWith(".json")) {
      setTargetFormat("csv");
      return;
    }
    if (file?.name.endsWith(".zip")) {
      setTargetFormat("list");
      return;
    }
    setTargetFormat("");
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const convertFile = async () => {
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv" && targetFormat === "json") {
      const text = await file.text();
      const result = Papa.parse(text, { header: true });
      setConvertedData(JSON.stringify(result.data, null, 2));
    } else if (fileExtension === "json" && targetFormat === "csv") {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      const csv = Papa.unparse(jsonData);
      setConvertedData(csv);
    } else if (fileExtension === "zip" && targetFormat === "list") {
      const zip = new JSZip();
      const content = await zip.loadAsync(file);
      const files = Object.keys(content.files).map((filename) => filename);
      setConvertedData(JSON.stringify(files, null, 2));
    } else {
      alert("Unsupported file format or conversion");
    }
  };

  const downloadFile = () => {
    if (!convertedData) return;

    const blob = new Blob([convertedData], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${targetFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!convertedData) return;

    navigator.clipboard.writeText(convertedData).then(
      () => {
        alert("Inhalt in die Zwischenablage kopiert.");
      },
      (err) => {
        alert("Failed to copy text: " + err);
      },
    );
  };

  return (
    <Flex
      direction={"column"}
      align={"center"}
      className={"p-4 text-center"}
      gap={"4"}
    >
      <Heading size={"7"}>Datei umwandeln</Heading>
      <Callout.Root className={"self-center"}>
        <Callout.Icon>
          <LockClosedIcon />
        </Callout.Icon>
        <Callout.Text>
          Alle Angaben bleiben nur auf deinem Gerät gespeichert.
        </Callout.Text>
      </Callout.Root>
      <Flex
        gap={"2"}
        direction={"column"}
        width={"100%"}
        maxWidth={"1200px"}
        align={"center"}
      >
        <Flex gap={"2"} align={"center"} direction={"column"} width={"50%"}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <TextField.Root
            type="text"
            disabled={true}
            value={file?.name || ""}
            onChange={handleFileChange}
            className={"w-full"}
          >
            <TextField.Slot px={"0"} side={"right"}>
              <Button onClick={() => fileInputRef.current?.click()}>
                <FilePlusIcon />
                Datei auswählen
              </Button>
            </TextField.Slot>
          </TextField.Root>
        </Flex>
        {file && (
          <>
            <Flex gap={"2"} align={"center"}>
              <Text>in</Text>
              <Select.Root value={targetFormat} onValueChange={setTargetFormat}>
                <Select.Trigger />
                <Select.Content className={"w-full!"}>
                  <Select.Group>
                    <Select.Label>Dateiformate</Select.Label>
                    <Select.Item
                      value="csv"
                      disabled={!file?.name.endsWith(".json")}
                    >
                      CSV
                    </Select.Item>
                    <Select.Item
                      value="json"
                      disabled={!file?.name.endsWith(".csv")}
                    >
                      JSON
                    </Select.Item>
                    <Select.Item
                      value="list"
                      disabled={!file?.name.endsWith(".zip")}
                    >
                      Liste
                    </Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
              <Button onClick={convertFile}>
                <ArchiveIcon />
                Umwandeln
              </Button>
            </Flex>
          </>
        )}
      </Flex>
      {convertedData && (
        <>
          <TextArea
            rows={40}
            cols={500}
            value={convertedData}
            readOnly
          ></TextArea>
          <Flex gap={"4"}>
            <Button disabled={!convertedData} onClick={downloadFile}>
              <DownloadIcon /> Download
            </Button>
            <Button disabled={!convertedData} onClick={copyToClipboard}>
              <CopyIcon />
              Kopieren
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}
