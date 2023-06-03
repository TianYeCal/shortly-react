import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import React from "react";

export function SingleLink({ deleteItem, item }) {
  const [isCopied, setIsCopied] = useState(item.isCopied);
  console.log(item.isCopied);
  return (
    <div key={item.id} className="container single-link">
      <p className="original-link">{item.link}</p>
      <div className="shorten-right">
        <p className="shortened-link">{item.shortenedLink}</p>
        {/* <CopyToClipboard
         text={item.link}
         onCopy={() => setClipBoardState(true)}
        >
         <button className="btn copy-btn">
           {clipBoardState ? "Copied" : "Copy"}
         </button>
        </CopyToClipboard> */}
        <button
          className={isCopied ? "btn copy-btn color-change" : "btn copy-btn"}
          onClick={() => {
            navigator.clipboard.writeText(item.shortenedLink);
            setIsCopied(true);
          }}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
        <button className="btn delete-btn" onClick={() => deleteItem(item.id)}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}
