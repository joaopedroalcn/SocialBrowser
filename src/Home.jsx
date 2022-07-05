import React, { useContext, useState } from "react";
import { PostsContext } from "./contexts/PostsContext";
import { logout } from "./firebase";
import Expenses from "./routes/expenses";

const Home = () => {
  const {
    user,
    post,
    setPost,
    nome,
    setNome,
    email,
    setEmail,
    content,
    setContent,
  } = useContext(PostsContext);

  function addPost() {
    event.preventDefault();
    setContent([...content, [post, nome, email]]);
    setPost("");
    setNome("");
    setEmail("");
  }

  function handleCaptureValuePost() {
    setPost(event.target.value);
  }

  function handleCaptureValueName() {
    setNome(event.target.value);
  }

  function handleCaptureValueEmail() {
    setEmail(event.target.value);
  }

  function handleRemovePost(postRemovido) {
    const arrayDpsDaRemocao = content.filter((postExistente) => {
      return postExistente !== postRemovido;
    });

    setContent(arrayDpsDaRemocao);
  }

  function handleEditPost(postEdit) {
    const arrayDpsDaRemocao = content.filter((postExistente) => {
      return postExistente !== postEdit;
    });
    const valorText = prompt("Digite um novo texto para este post");
    const valorName = prompt("Digite um novo nome para este post");
    const valorEmail = prompt("Digite um novo email para este post");

    setContent([[valorText, valorName, valorEmail], ...arrayDpsDaRemocao]);
    // [...content, [post,nome]]

    setPost("");
    setNome("");
    setEmail("");
  }

  return (
    <div className='home'>
      <h1>Hello, {user.displayName}</h1>
      <img src={user.photoURL} referrerPolicy='no-referrer' />
      <button className='button signout' onClick={logout}>
        Sign out
      </button>

      <form method='post' onSubmit={addPost} style={{ marginTop: "2rem" }}>
        <textarea
          type='text'
          onChange={handleCaptureValuePost}
          placeholder='Insira um post'
          value={post}
        />
        <input
          type='text'
          onChange={handleCaptureValueName}
          placeholder='Nome'
          value={nome}
        />
        <input
          type='email'
          onChange={handleCaptureValueEmail}
          placeholder='Email'
          value={email}
        />
        <button type='submit'>Postar</button>
      </form>

      <div>
        <Expenses />
      </div>
    </div>
  );
};

export default Home;
