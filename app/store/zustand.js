import { create } from "zustand";
import { supabase } from "../lib/supabase";


export const usePostStore = create((set) => ({
  xtall: [],
  banner: [],
  ability: [],
  bos: [],
  bosId: [],
  appview: [],
  editXtall: null,
  loading: false,
  error: null,
  success: null,

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
  searchData: async (q) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("xtall")
      .select("*")
      .ilike("name", `%${q}%`);
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set({ xtall: data, loading: false });
  },
  editXtall: async (id, name, type, stat, route) => {
    set({ loading: true, error: null, success: null });

    const { data, error } = await supabase
      .from("xtall")
      .update({ name, type, stat, route })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    // update state lokal
    set((state) => ({
      xtall: state.xtall.map((item) =>
        item.id === id ? data : item
      ),
      loading: false,
      success: "Berhasil di edit"
    }));
  },
  inputxtall: async (name, type, stat, route) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("xtall")
      .insert([{ name, type, upgrade, stat, route }])
      .select()
      .single();
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set((state) => ({
      xtall: [...state.xtall, data],
      loading: false
    }));
  },
  deleteData: async (id) => {
    set({ loading: true, error: null });
    const { error } = await supabase
      .from("xtall")
      .delete()
      .eq("id", id);
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set((state) => ({
      xtall: state.xtall.filter((item) => item.id !== id),
      loading: false
    }));
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
        banner: json.data,
        loading: false
      });

    } catch (err) {
      set({
        error: err.message,
        loading: false
      });
    }
  },
  featchBos: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.from("bosdef").select("*");
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set({ bos: data, loading: false });
  },
  searchBos: async (q) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.from("bosdef").select("*").ilike("name", `%${q}%`);
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set({ bos: data, loading: false });
  },
  insertBos: async (name, type, image_url, spawn, element, stat) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("bosdef")
      .insert([{ name, type, image_url, spawn, element, stat }])
      .select()
      .single();
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set((state) => ({
      bos: [...state.bos, data],
      loading: false
    }));
  },
  editBos: async (id, name, type, image_url, spawn, element, stat) => {
    set({ loading: true, error: null, success: null });
    const { data, error } = await supabase
      .from("bosdef")
      .update({ name, type, image_url, spawn, element, stat })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    // update state lokal
    set((state) => ({
      bos: state.bos.map((item) =>
        item.id === id ? data : item
      ),
      loading: false,
      success: "Berhasil di edit"
    }));
  },
  deleteBos: async (id) => {
    set({ loading: true, error: null });
    const { error } = await supabase
      .from("bosdef")
      .delete()
      .eq("id", id);
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    set((state) => ({
      bos: state.bos.filter((item) => item.id !== id),
      loading: false
    }));
  },
  searchByidBos: async (id) => {
    set({ error: null })
    const { data, error } = await supabase.from("bosdef").select("*").eq("id", id).select().single();
    set({ bosId: data })
  },
  fetchAppview: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.from("appview").select("*");
    if (error) return set({ error: error.message, loading: false });
    set({ appview: data, loading: false });
  },
  searchAppview: async (query) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.from("appview").select("*").ilike("name", `%${query}%`);
    if (error) return set({ error: error.message, loading: false });
    set({ appview: data, loading: false });
  },
  deleteAppview: async (id) => {
    set({ loading: true, error: null, success: null });
    const { error } = await supabase.from("appview").delete().eq("id", id);
    if (error) return set({ error: error.message, loading: false });
    set((state) => ({
      appview: state.appview.filter((item) => item.id !== id),
      loading: false,
      success: "Berhasil di hapus"
    }));
  },
  insertAppview: async (name, image_url) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from("appview")
      .insert([{ name, image_url }])
      .select()
      .single();
    if (error) return set({ error: error.message, loading: false });
    set((state) => ({
      appview: [...state.appview, data],
      loading: false
    }));
  },
  updateAppview: async (id, name, image_url) => {
    set({ loading: true, error: null, success: null });
    const { data, error } = await supabase
      .from("appview")
      .update({ name, image_url })
      .eq("id", id)
      .select()
      .single();
    if (error) return set({ error: error.message, loading: false });
    // update state lokal
    set((state) => ({
      appview: state.appview.map((item) =>
        item.id === id ? data : item
      ),
      loading: false,
      success: "Berhasil di edit"
    }));
  },
  getAbility: async () => {
    set({ loading: true, error: null })
    const { data, error } = await supabase.from("ability").select("nama, stat_effect, tier")

    if (error) return set({ error: error.message, loading: false });

    const parseMessage = data.map((item) => ({
      name: item.nama,
      tier: item.tier,
      stat: item.stat_effect
    }))
    set({ ability: parseMessage, loading: false })
  }
}));
