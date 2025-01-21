"use client"

import api from "./axiosInstance";

export async function ordinaryPreview() {
  try {
    const res = await api.get("regular_plan_preview");
    return res.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching data from ordinaryPreview:', error);
    return null; // Return null or handle error accordingly
  }
}

export async function commitedPreview() {
  try {
    const res = await api.get("committed_plan_preview");
    return res.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching data from commitedPreview:', error);
    return null; // Return null or handle error accordingly
  }
}

export async function youngPreview() {
  try {
    const res = await api.get("young_plan_preview");
    return res.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching data from youngPreview:', error);
    return null; // Return null or handle error accordingly
  }
}
