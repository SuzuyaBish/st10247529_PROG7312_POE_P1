import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { ArrowDown, ArrowUp, Star } from "lucide-react";

export function ReplacingBooks() {
  const [callNumbers, setCallNumbers] = useState({ random: [], sorted: [] });
  const [allCorrect, setAllCorrect] = useState(false);
  const [stars, setStars] = useState(10);
  const [lostState, setLostState] = useState(false);

  const fetchCallNumbers = async () => {
    try {
      const response = await fetch("replacing");
      const data = await response.json();
      setCallNumbers({
        random: data.randomCallNumbers,
        sorted: data.sortedCallNumbers,
      });
    } catch (error) {
      console.error("Error fetching call numbers:", error);
    }
  };

  useEffect(() => {
    fetchCallNumbers();
  }, []);

  return (
    <div className="text-foreground container py-10 flex flex-col min-h-screen items-center justify-center">
      <div className="text-3xl font-medium">Replacing Books</div>
      <div className="bg-muted p-5 rounded mt-10">
        <div className="text-center text-sm text-muted-foreground">
          In this you start with 10 stars. Everytime you get the order wrong you
          will lose 5 stars and everytime you get the order right you will gain
          10 stars. <br /> Once your stars are less than 0 the list will reset.
        </div>
      </div>
      <div className="flex items-center justify-between w-full my-10">
        <div className="flex items-center space-x-3">
          <Star className="text-[#FFDB51]" />
          <div className="text-xl font-medium">{stars}</div>
        </div>
        <Button
          onClick={async () => {
            if (callNumbers.random.join("") === callNumbers.sorted.join("")) {
              setAllCorrect(true);
              setStars(stars + 10);
              await fetchCallNumbers();
            } else {
              setAllCorrect(false);

              if (stars >= 5) {
                setStars(stars - 5);
              } else {
                setLostState(true);
                setStars(10);
                await fetchCallNumbers();
              }
            }
          }}
        >
          Check Order
        </Button>
      </div>
      <div className="w-full space-y-3">
        {callNumbers.random?.map((code) => {
          return (
            <div
              className={`${
                allCorrect ? "border border-primary" : "border"
              } flex items-center justify-between bg-muted p-2 rounded`}
            >
              <div className="font-medium">{code}</div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    if (callNumbers.random.indexOf(code) === 0) return;

                    const index = callNumbers.random.indexOf(code);
                    const newCallNumbers = callNumbers.random;
                    newCallNumbers[index] = newCallNumbers[index - 1];
                    newCallNumbers[index - 1] = code;
                    setCallNumbers({ ...callNumbers, random: newCallNumbers });
                  }}
                  className="p-1 m-0 h-fit"
                >
                  <ArrowUp />
                </Button>
                <Button
                  onClick={() => {
                    if (
                      callNumbers.random.indexOf(code) ===
                      callNumbers.random.length - 1
                    )
                      return;

                    const index = callNumbers.random.indexOf(code);
                    const newCallNumbers = callNumbers.random;
                    newCallNumbers[index] = newCallNumbers[index + 1];
                    newCallNumbers[index + 1] = code;
                    setCallNumbers({ ...callNumbers, random: newCallNumbers });
                  }}
                  className="p-1 m-0 h-fit"
                >
                  <ArrowDown />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
