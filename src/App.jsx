import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => { loadMemos(); }, []);   // 처음 뜰 때 서버에서 목록을 불러온다

  const loadMemos = async () => {
    const res = await fetch(`${API_URL}/memos`);   // 목록 조회 GET
    setMemos(await res.json());
  };
  const addMemo = async () => {
    if (!text.trim()) return;
    await fetch(`${API_URL}/memos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),   // JS 객체 → JSON 문자열
    });
    setText(""); loadMemos();
  };
  const deleteMemo = async (id) => {
    await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });
    loadMemos();
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>📝 메모장</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)}
          placeholder="메모를 입력하세요" style={{ flex: 1, padding: 8 }} />
        <button onClick={addMemo}>추가</button>
      </div>
      <ul>
        {memos.map((m) => (
          <li key={m.id}>
            {m.content}
            <button onClick={() => deleteMemo(m.id)} style={{ marginLeft: 8 }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}