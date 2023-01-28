import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState, memo, useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });

export type SwatchProps = {
  params: { color: string };
};

const Swatch: React.FC<SwatchProps> = ({ params }) => {
  console.log(`Swatch Rendered with ${params.color}`);
  return (
    <div
      className={`w-16 h-16 m-4`}
      style={{ backgroundColor: params.color }}
    ></div>
  );
};

/**
 * memo is a higher order function
 * It creates component i.e, memoized component
 * The memoized component only re-renders if it's props changes
 * only works for primitive types unles you specify areEquals parameter
 * Use useMemo for object types
 */
const MemoedSwatch = memo(
  Swatch
  // (
  //   prevProps: Readonly<SwatchProps>,
  //   nextProps: Readonly<SwatchProps>
  // ): boolean => {
  //   return prevProps.params.color === nextProps.params.color;
  // }
);

export default function Home() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);
  const [color, setColor] = useState("red");
  console.log(`App Rendered ${appRenderIndex}`);

  /**
   * useMemo return the same object if the value in the dependency array does not changes even with the re-render
   * it will return the object with the same address i.e exact same object reference, if the dependency value does not change
   */
  const params = useMemo(
    () => ({
      color,
    }),
    [color]
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          <button
            className="border-2 px-3 py-2 rounded-md bg-emerald-200"
            onClick={() => setAppRenderIndex((prev) => prev + 1)}
          >
            Re-Render App
          </button>

          <button
            className="border-2 px-3 py-2 rounded-md bg-red-200"
            onClick={() => setColor(color === "red" ? "blue" : "red")}
          >
            Change Swatch Color
          </button>
        </div>
        <div>
          {/* Everytime it re-renders, it creates new object with new reference. It may have excatly the same value but it always has new reference */}
          <MemoedSwatch params={params} />
          {/* <MemoedSwatch color={color == "red" ? "blue" : "red"} /> */}
        </div>
      </div>
    </>
  );
}
