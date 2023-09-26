import React from "react";
import { Button, buttonVariants } from "./ui/Button";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="flex min-h-screen flex-col container justify-center text-foreground">
      <div className="text-center my-10 space-y-5">
        <div className="text-3xl">Available Tasks</div>
        <div>At the moment only the "Replacing Books" task is implemented.</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/replacing-books"
          className={buttonVariants({ variant: "default" })}
        >
          Replacing Books
        </Link>
        <Button disabled>Identifying Areas</Button>
        <Button disabled>Finding Call Numbers</Button>
      </div>
    </div>
  );
}
