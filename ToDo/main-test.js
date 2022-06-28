import "./style.css";
import { supabase } from "./supabase";

const blogsContainer = document.getElementById("blogs");
const form = document.getElementById("form");
const title = document.getElementById("title");
const content = document.getElementById("content");

/*********************************************************************************/
const useData = async () => {
  const { data, error } = await supabase.from("blogs").select(); // gets the data from supabase
  
  let html = "";
  data.forEach((blog) => {
    html += `
    <div data-id="${blog.id}">
      <h1 class="text-2xl">${blog.title}</h1>
      <p>${blog.content}</p>
    </div>
    `;
  });
  blogsContainer.innerHTML = html;
};

/*********************************************************************************/
window.addEventListener("DOMContentLoaded", useData);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { data, error } = await supabase.from("blogs").insert([
    {
      title: title.value,
      content: content.value,
      
    },
  ]); // insert data into supabase  s

  useData();
});