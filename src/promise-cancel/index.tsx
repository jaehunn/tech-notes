import React, { useEffect, useRef, useState } from "react";

/**
 * @see https://tech.kakao.com/2023/01/11/promise-cancelation-in-javascript/
 *
 * Promise 취소 여부 판단하기.
 * 1. 특정 액션이 발생하면, 취소 신호를 보낼 수 있다.
 * 2. 특정 시간동안 취소 액션이 발생하지않으면, 취소가 되지않았음을 신호로 보낼 수 있다.
 */

const PromiseCancel = () => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const [user, setUser] = useState({
    name: "",
    gender: "",
  });

  useEffect(() => {
    // getMe Promise
    const fetchMe = fetch("/api/me");

    // cancelToken Promise
    const cancelFetchMe = new Promise((resolve, _) => {
      // 취소버튼이 클릭되면, 호출부에 취소승인 신호를 보낸다.
      (cancelButtonRef?.current as HTMLButtonElement).onclick = () => {
        resolve("프로필보기를 취소하였습니다.");
      };
    });

    // timeout cancelToken Promise
    const cancelTimeoutFetchMe = (time = 3000) => {
      return new Promise((resolve, reject) => {
        // time 만큼 지난 후에 호출부로 취소거절 신호를 보낸다.
        const timeout = setTimeout(
          () => resolve(`${time}ms 내에 프로필보기를 취소하지않았습니다.`),
          time
        );

        // 취소버튼이 클릭되면, timeout 를 초기화한다.
        cancelFetchMe?.then((res) => {
          console.log(res);
          clearTimeout(timeout);
        });
      });
    };

    try {
      Promise.race([fetchMe, cancelTimeoutFetchMe()]).then((resolved) => {
        console.log(resolved);
      });
    } catch (err) {
      alert(err);
    }
  }, []);

  return (
    <div>
      <div>
        <h3>
          {user?.name ?? "이름 없음"} ({user?.gender ?? "성별 없음"})
        </h3>
      </div>

      <button ref={cancelButtonRef}>내 프로필 안봐도 돼요.</button>
    </div>
  );
};

export default PromiseCancel;
