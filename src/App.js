/* src/App.js */

// Reactと関連ライブラリをインポートする
import React, { useEffect, useState } from "react";
// import Amplify, { API, graphqlOperation } from "aws-amplify";

// GraphQLのmutationとqueryをインポートする
// import { createTodo } from "./graphql/mutations";
// import { listTodos } from "./graphql/queries";

// AWS Amplifyの設定を読み込む
// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);

// 初期状態を定義する
const initialState = { name: "", description: "" };

// アプリケーションのメインコンポーネントを定義する
const App = () => {
  // ステート変数を定義する
  const [formState, setFormState] = useState(initialState);
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState([]);

  // ページが読み込まれた時に実行される処理を定義する
  useEffect(() => {
    fetchTodos();
  }, []);

  // フォームの入力値を更新する関数を定義する
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  // Todoリストを取得する関数を定義する
  async function fetchTodos() {
    try {
      // // GraphQLのqueryを実行して、Todoリストを取得する
      // const todoData = await API.graphql(graphqlOperation(listTodos));
      // const todos = todoData.data.listTodos.items;
      // // 取得したTodoリストをステート変数にセットする
      // setTodos(todos);

      // init todos
      const todos = [
        {
          name: "bbb",
          description: "bbb",
        },
        {
          name: "あああ",
          description: "あああ",
        },
        {
          name: "aaa",
          description: "aaa",
        },
        {
          name: "Aaa",
          description: "Aaa",
        },
      ];

      // ソート
      const sortedTodos = todos.sort((a, b) => {
        // const nameA = a.name.toUpperCase(); // 大文字と小文字を無視する
        // const nameB = b.name.toUpperCase(); // 大文字と小文字を無視する
        const nameA = a.name; // 大文字と小文字を無視する
        const nameB = b.name; // 大文字と小文字を無視する
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // 名前が等しい
        return 0;
      });
      setTodos(sortedTodos);

      // 取得結果をブラウザのログに出力する(デバッグ用)
      console.table(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  // Todoを追加する関数を定義する
  async function addTodo() {
    try {
      // バリデーションチェックを行う
      if (!formState.name || !formState.description) return;
      // 入力されたTodoを作成する
      const todo = { ...formState };
      // ステート変数にTodoを追加する
      setTodos([...todos, todo]);
      // フォームの入力値を初期化する
      setFormState(initialState);
      // GraphQLのmutationを実行して、Todoを作成する
      // await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  // JSXを返す
  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
        aria-label="name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
        aria-label="description"
      />
      <button style={styles.button} onClick={addTodo} id="createTodoButton">
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

// スタイルを定義する
const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

// アプリケーションのメインコンポーネントをエクスポートする
export default App;
