import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const usePostStore = create((set) => ({
  xtall: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });

    const { data, error } = await supabase
      .from("xtall")
      .select("*");

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    set({ xtall: data, loading: false });
  },
  fetchBanner: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("https://neura.mochinime.cyou/api/banner");

      if (!res.ok) {
        throw new Error("Gagal mengambil data banner");
      }

      const json = await res.json();

      if (!json.data || !Array.isArray(json.data)) {
        throw new Error("Format data banner tidak valid");
      }

      set({
        xtall: json.data,
        loading: false
      });

    } catch (err) {
      set({
        error: err.message,
        loading: false
      });
    }
  }

}));
