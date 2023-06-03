import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
const ShortenLink = ({ items, deleteItem }) => {
  // const [clipBoardState, setClipBoardState] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Wrapper className="shorten-links">
      {items.map((item) => {
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
                className="btn copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(item.shortenedLink);
                  setIsCopied(true);
                }}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
              <button
                className="btn delete-btn"
                onClick={() => deleteItem(item.id)}
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding-top: 2rem;
  .shorten-links {
    background: hsl(0, 0%, 90%);
    padding-bottom: 2rem;
    width: 80vw;
  }
  .single-link {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 1rem 0.75rem;
    justify-content: space-between;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .shorten-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .shortened-link {
    color: hsl(180, 66%, 49%);
  }
  .copy-btn,
  .delete-btn {
    border-radius: 0.25rem;
  }
  .delete-btn {
    font-size: 18px;
    padding: 0.5rem;
  }
  @media (max-width: 768px) {
    .shorten-links {
      margin-top: 2rem;
    }
    .single-link {
      flex-direction: column;
      text-align: left;
      justify-content: left;
    }
    .original-link {
      width: 100%;
      text-align: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid hsl(257, 7%, 63%);
    }
    .shortened-link {
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .shorten-right {
      flex-direction: column;
      align-items: center;
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;
export default ShortenLink;
