"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ArrowLeft, 
  Lock, 
  User as UserIcon, 
  LogOut, 
  Newspaper, 
  Plus, 
  Trash2, 
  Video, 
  Calendar, 
  Image as ImageIcon,
  CheckCircle,
  Loader2,
  AlertCircle,
  Pencil
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  videoUrl?: string;
  category?: string;
};

type TeacherItem = {
  id: string;
  name: string;
  position: string;
  photo: string;
  specialty?: string;
  experience?: string;
  description?: string;
};

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Navigation State inside Admin Panel
  const [currentView, setCurrentView] = useState<"dashboard" | "news" | "teachers">("dashboard");

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ id: string; title: string } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Yangiliklar");
  
  // Image upload state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Video file upload state
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Teachers State
  const [teachersList, setTeachersList] = useState<TeacherItem[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [teacherEditId, setTeacherEditId] = useState<string | null>(null);
  const [teacherDeleteConfirmItem, setTeacherDeleteConfirmItem] = useState<{ id: string; name: string } | null>(null);

  // Teacher Form State
  const [teacherName, setTeacherName] = useState("");
  const [teacherPosition, setTeacherPosition] = useState("");
  const [teacherSpecialty, setTeacherSpecialty] = useState("");
  const [teacherExperience, setTeacherExperience] = useState("");
  const [teacherDescription, setTeacherDescription] = useState("");
  
  // Teacher image upload state
  const [teacherImagePreview, setTeacherImagePreview] = useState<string | null>(null);
  const [teacherImageUrl, setTeacherImageUrl] = useState("");
  const [uploadingTeacherImage, setUploadingTeacherImage] = useState(false);
  const [isDraggingTeacher, setIsDraggingTeacher] = useState(false);
  const teacherFileInputRef = useRef<HTMLInputElement>(null);

  // Submit / Git Sync State
  const [submitting, setSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Check login on load
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("is_admin_logged_in") === "true";
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch news list when switching to news view
  useEffect(() => {
    if (isAuthenticated && currentView === "news") {
      fetchNews();
    }
  }, [isAuthenticated, currentView]);

  // Fetch teachers list when switching to teachers view
  useEffect(() => {
    if (isAuthenticated && currentView === "teachers") {
      fetchTeachers();
    }
  }, [isAuthenticated, currentView]);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const res = await fetch(`/api/news?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setNewsList(data);
      }
    } catch (error) {
      console.error("News load error:", error);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchTeachers = async () => {
    setLoadingTeachers(true);
    try {
      const res = await fetch(`/api/teachers?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setTeachersList(data);
      }
    } catch (error) {
      console.error("Teachers load error:", error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Ozodbek" && password === "Eua5gd007") {
      setIsAuthenticated(true);
      sessionStorage.setItem("is_admin_logged_in", "true");
      setLoginError("");
    } else {
      setLoginError("Login yoki parol noto'g'ri kiritildi.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("is_admin_logged_in");
    setCurrentView("dashboard");
  };

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const ytId = getYouTubeId(videoUrl);

  // Helper for Uploading Image File
  const uploadImageFile = async (file: File) => {
    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);
    setSubmitError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Rasm yuklashda xatolik yuz berdi");

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        throw new Error(data.error || "Rasm yuklashda muammo");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Rasm yuklashda xatolik yuz berdi.";
      setSubmitError(errMsg);
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Image Selection and Upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImageFile(file);
  };

  // Drag and Drop handlers for Image Upload
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Faqat rasm fayllarini surib yuklashingiz mumkin.");
      return;
    }

    uploadImageFile(file);
  };

  // Handle Video Selection and Upload
  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload immediately
    setUploadingVideo(true);
    setSubmitError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Video yuklashda xatolik yuz berdi");

      const data = await res.json();
      if (data.success) {
        setVideoUrl(data.url);
      } else {
        throw new Error(data.error || "Video yuklashda muammo");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Video yuklashda xatolik yuz berdi.";
      setSubmitError(errMsg);
    } finally {
      setUploadingVideo(false);
    }
  };

  // Helper for Uploading Teacher Image File
  const uploadTeacherImageFile = async (file: File) => {
    setTeacherImagePreview(URL.createObjectURL(file));
    setUploadingTeacherImage(true);
    setSubmitError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Rasm yuklashda xatolik yuz berdi");

      const data = await res.json();
      if (data.success) {
        setTeacherImageUrl(data.url);
      } else {
        throw new Error(data.error || "Rasm yuklashda muammo");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Rasm yuklashda xatolik yuz berdi.";
      setSubmitError(errMsg);
      setTeacherImagePreview(null);
    } finally {
      setUploadingTeacherImage(false);
    }
  };

  // Handle Teacher Image Selection and Upload
  const handleTeacherImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadTeacherImageFile(file);
  };

  // Drag and Drop handlers for Teacher Image Upload
  const handleTeacherDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingTeacher(true);
  };

  // Handle Teacher Drag Leave
  const handleTeacherDragLeave = () => {
    setIsDraggingTeacher(false);
  };

  // Handle Teacher Drop
  const handleTeacherDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingTeacher(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Faqat rasm fayllarini surib yuklashingiz mumkin.");
      return;
    }

    uploadTeacherImageFile(file);
  };

  // Handle teacher submission
  const handleSubmitTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim() || !teacherPosition.trim()) {
      setSubmitError("F.I.SH. va lavozim bo'sh bo'lishi mumkin emas.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    setSyncStatus("Pedagog ma'lumotlari saqlanmoqda...");

    try {
      const teacherData = {
        id: teacherEditId || undefined,
        name: teacherName,
        position: teacherPosition,
        photo: teacherImageUrl,
        specialty: teacherSpecialty,
        experience: teacherExperience,
        description: teacherDescription,
      };

      setSyncStatus("GitHub bilan sinxronizatsiya qilinmoqda (Push)...");

      const res = await fetch("/api/teachers", {
        method: teacherEditId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      if (!res.ok) {
        let errMsg = "Saqlashda xatolik yuz berdi";
        try {
          const errData = await res.json();
          if (errData.error) errMsg = errData.error;
        } catch {}
        throw new Error(errMsg);
      }

      const data = await res.json();

      if (data.success) {
        if (data.gitSync && !data.gitSync.success) {
          alert(`Pedagog saqlandi, lekin GitHub'ga yuklashda muammo yuz berdi:\n${data.gitSync.error}\n\nLokal o'zgarishlar saqlandi.`);
        }
        setSubmitSuccess(true);
        // Clear form
        setTeacherEditId(null);
        setTeacherName("");
        setTeacherPosition("");
        setTeacherSpecialty("");
        setTeacherExperience("");
        setTeacherDescription("");
        setTeacherImageUrl("");
        setTeacherImagePreview(null);
        
        // Refresh list
        fetchTeachers();
        
        // Close form after a delay
        setTimeout(() => {
          setShowTeacherForm(false);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        throw new Error(data.error || "GitHub push xatosi");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Saqlash va yuklashda xatolik yuz berdi.";
      setSubmitError(errMsg);
    } finally {
      setSubmitting(false);
      setSyncStatus("");
    }
  };

  // Handle teacher edit mode activation
  const handleTeacherEditClick = (item: TeacherItem) => {
    setTeacherEditId(item.id);
    setTeacherName(item.name);
    setTeacherPosition(item.position);
    setTeacherSpecialty(item.specialty || "");
    setTeacherExperience(item.experience || "");
    setTeacherDescription(item.description || "");
    setTeacherImageUrl(item.photo || "");
    setTeacherImagePreview(item.photo || null);
    setShowTeacherForm(true);
    // Scroll form into view
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete teacher
  const handleDeleteTeacher = async (id: string) => {
    setSubmitting(true);
    setSyncStatus("Pedagog o'chirilmoqda va GitHub'ga yuklanmoqda...");

    try {
      const res = await fetch(`/api/teachers?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("O'chirishda xatolik yuz berdi");

      const data = await res.json();
      if (data.success) {
        if (data.gitSync && !data.gitSync.success) {
          alert(`Pedagog o'chirildi, lekin GitHub'ga yuklashda muammo yuz berdi:\n${data.gitSync.error}\n\nLokal o'zgarishlar saqlandi.`);
        }
        fetchTeachers();
      } else {
        throw new Error(data.error || "GitHub push xatosi");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Xatolik yuz berdi.";
      alert(`Xatolik: ${errMsg}`);
    } finally {
      setSubmitting(false);
      setSyncStatus("");
    }
  };

  // Handle news submission
  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setSubmitError("Sarlavha va matn bo'sh bo'lishi mumkin emas.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    setSyncStatus("Yangilik ma'lumotlari saqlanmoqda...");

    try {
      const postData = {
        id: editId || undefined,
        title,
        excerpt,
        content,
        image: imageUrl,
        videoUrl,
        date,
        category,
      };

      setSyncStatus("GitHub bilan sinxronizatsiya qilinmoqda (Push)...");

      const res = await fetch("/api/news", {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        let errMsg = "Saqlashda xatolik yuz berdi";
        try {
          const errData = await res.json();
          if (errData.error) errMsg = errData.error;
        } catch {}
        throw new Error(errMsg);
      }

      const data = await res.json();

      if (data.success) {
        if (data.gitSync && !data.gitSync.success) {
          alert(`Yangilik saqlandi, lekin GitHub'ga yuklashda muammo yuz berdi:\n${data.gitSync.error}\n\nLokal o'zgarishlar saqlandi.`);
        }
        setSubmitSuccess(true);
        // Clear form
        setEditId(null);
        setTitle("");
        setExcerpt("");
        setContent("");
        setVideoUrl("");
        setImageUrl("");
        setImagePreview(null);
        setDate(new Date().toISOString().split("T")[0]);
        setCategory("Yangiliklar");
        
        // Refresh list
        fetchNews();
        
        // Close form after a delay
        setTimeout(() => {
          setShowAddForm(false);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        throw new Error(data.error || "GitHub push xatosi");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Saqlash va yuklashda xatolik yuz berdi.";
      setSubmitError(errMsg);
    } finally {
      setSubmitting(false);
      setSyncStatus("");
    }
  };

  // Handle edit mode activation
  const handleEditClick = (item: NewsItem) => {
    setEditId(item.id);
    setTitle(item.title);
    setExcerpt(item.excerpt);
    setContent(item.content);
    setVideoUrl(item.videoUrl || "");
    setImageUrl(item.image || "");
    setImagePreview(item.image || null);
    setDate(item.date);
    setCategory(item.category || "Yangiliklar");
    setShowAddForm(true);
    // Scroll form into view
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete news
  const handleDeleteNews = async (id: string) => {
    setSubmitting(true);
    setSyncStatus("Yangilik o'chirilmoqda va GitHub'ga yuklanmoqda...");

    try {
      const res = await fetch(`/api/news?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("O'chirishda xatolik yuz berdi");

      const data = await res.json();
      if (data.success) {
        if (data.gitSync && !data.gitSync.success) {
          alert(`Yangilik o'chirildi, lekin GitHub'ga yuklashda muammo yuz berdi:\n${data.gitSync.error}\n\nLokal o'zgarishlar saqlandi.`);
        }
        fetchNews();
      } else {
        throw new Error(data.error || "GitHub push xatosi");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Xatolik yuz berdi.";
      alert(`Xatolik: ${errMsg}`);
    } finally {
      setSubmitting(false);
      setSyncStatus("");
    }
  };

  return (
    <main className="min-h-screen bg-bg-dark pt-24 pb-16 text-white">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        
        {/* LOGIN SCREEN */}
        {!isAuthenticated && (
          <div className="mx-auto max-w-md mt-12">
            <ScrollReveal>
              <GlassCard gradientBorder hover={false} className="p-8">
                <div className="flex flex-col items-center mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white text-center">
                    Admin Panelga kirish
                  </h1>
                  <p className="text-xs text-text-muted mt-2">Xususiy tizimga kirish uchun login va parolingizni kiriting</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Login
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                        <UserIcon className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Login kiritish"
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Parol
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                        <Lock className="h-4 w-4" />
                      </span>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                      />
                    </div>
                  </div>

                  {loginError && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-primary/50"
                  >
                    Kirish
                  </button>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        )}

        {/* LOGGED IN DASHBOARD */}
        {isAuthenticated && (
          <div className="space-y-8">
            
            {/* Admin Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
              <div>
                <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white flex items-center gap-2">
                  Shahrisabz Tibbiyot Texnikumi
                  <span className="rounded-full bg-accent-green/10 border border-accent-green/30 px-2.5 py-0.5 text-xs text-accent-green font-medium">Admin</span>
                </h1>
                <p className="text-sm text-text-muted mt-1">Hush kelibsiz, Ozodbek! Tizim ma&apos;lumotlarini shu yerdan boshqarasiz.</p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Chiqish
              </button>
            </div>

            {/* DASHBOARD SELECTION VIEW */}
            {currentView === "dashboard" && (
              <div className="space-y-6">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text-soft">
                  Qaysi ma&apos;lumotlarni tahrirlamoqchisiz?
                </h2>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="cursor-pointer h-full"
                    onClick={() => setCurrentView("news")}
                  >
                    <GlassCard className="h-full group hover:border-primary/30 flex flex-col p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 group-hover:scale-110 transition-transform">
                        <Newspaper className="h-6 w-6" />
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white group-hover:text-primary transition-colors">
                        Yangiliklar
                      </h3>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        Saytning yangiliklar sahifasiga rasm, sarlavha, batafsil matn va YouTube video havolasi bilan yangi postlar qo&apos;shish va o&apos;chirish.
                      </p>
                    </GlassCard>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="cursor-pointer h-full"
                    onClick={() => setCurrentView("teachers")}
                  >
                    <GlassCard className="h-full group hover:border-primary/30 flex flex-col p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 group-hover:scale-110 transition-transform">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white group-hover:text-primary transition-colors">
                        Bizning jamoa
                      </h3>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        Texnikum o&apos;qituvchilari va rahbar xodimlari ro&apos;yxatini tahrirlash: yangi pedagog qo&apos;shish, o&apos;chirish va o&apos;zgartirish.
                      </p>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            )}

            {/* NEWS MANAGEMENT VIEW */}
            {currentView === "news" && (
              <div className="space-y-6">
                {/* View Header */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentView("dashboard");
                      setShowAddForm(false);
                    }}
                    className="inline-flex items-center gap-2 text-sm text-text-soft hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Panelga qaytish
                  </button>

                  {!showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-blue-500 hover:shadow-lg transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      Yangilik qo&apos;shish
                    </button>
                  )}
                </div>

                {/* ADD NEWS FORM CONTAINER */}
                <AnimatePresence>
                  {showAddForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <GlassCard gradientBorder hover={false} className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white flex items-center gap-2">
                            {editId ? <Video className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
                            {editId ? "Yangilikni tahrirlash" : "Yangi yangilik qo&apos;shish"}
                          </h2>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddForm(false);
                              setEditId(null);
                              setTitle("");
                              setExcerpt("");
                              setContent("");
                              setVideoUrl("");
                              setImageUrl("");
                              setImagePreview(null);
                              setDate(new Date().toISOString().split("T")[0]);
                              setCategory("Yangiliklar");
                              setSubmitError("");
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-text-soft hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Bekor qilish
                          </button>
                        </div>

                        <form onSubmit={handleSubmitNews} className="space-y-6">
                          
                          {/* Image Upload Input */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                              Post rasmi
                            </label>
                            
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                              <div 
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 w-full md:w-64 aspect-[16/10] cursor-pointer transition-all text-center ${
                                  isDragging 
                                    ? "border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/10" 
                                    : "border-white/10 hover:border-primary/50 bg-white/5"
                                }`}
                              >
                                {uploadingImage ? (
                                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                ) : (
                                  <>
                                    <ImageIcon className={`h-8 w-8 mb-2 transition-colors ${isDragging ? "text-primary animate-pulse" : "text-text-muted"}`} />
                                    <span className="text-xs font-semibold text-text-soft">
                                      {isDragging ? "Rasm faylini shu yerga tashlang" : "Rasm yuklash uchun bosing yoki surib tashlang"}
                                    </span>
                                    <span className="text-[10px] text-text-muted mt-1">PNG, JPG, JPEG (Maks. 5MB)</span>
                                  </>
                                )}
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />

                              {imagePreview && (
                                <div className="relative aspect-[16/10] w-full md:w-64 rounded-2xl overflow-hidden border border-white/10">
                                  <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Inputs Row */}
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                Post sarlavhasi *
                              </label>
                              <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Sarlavhani kiriting"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                Yuklangan sanasi *
                              </label>
                              <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none transition-all focus:border-primary/50"
                              />
                            </div>
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                Kategoriya (Mavzu turi)
                              </label>
                              <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Masalan: Tadbirlar, E'lonlar, Loyihalar"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                Video yuklash yoki YouTube havola
                              </label>
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={videoUrl.startsWith("/uploads/") ? "" : videoUrl}
                                  onChange={(e) => setVideoUrl(e.target.value)}
                                  placeholder="YouTube havola: https://www.youtube.com/watch?v=..."
                                  disabled={uploadingVideo}
                                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                                />
                                
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => videoFileInputRef.current?.click()}
                                    disabled={uploadingVideo}
                                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all disabled:opacity-50"
                                  >
                                    {uploadingVideo ? (
                                      <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        Video yuklanmoqda...
                                      </>
                                    ) : (
                                      <>
                                        <Video className="h-3.5 w-3.5 text-primary" />
                                        Video fayl yuklash
                                      </>
                                    )}
                                  </button>
                                  <input
                                    type="file"
                                    ref={videoFileInputRef}
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handleVideoChange}
                                  />
                                  {videoUrl && (
                                    <button
                                      type="button"
                                      onClick={() => setVideoUrl("")}
                                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                                    >
                                      Videoni o&apos;chirish
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* YouTube Video Preview block */}
                          {ytId && (
                            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 space-y-2">
                              <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                                <Video className="h-3.5 w-3.5 text-primary" />
                                Video Preview (YouTube):
                              </span>
                              <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden">
                                <iframe
                                  className="absolute inset-0 w-full h-full"
                                  src={`https://www.youtube.com/embed/${ytId}`}
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          )}

                          {/* Local Uploaded Video Preview block */}
                          {videoUrl && (videoUrl.startsWith("/uploads/") || videoUrl.endsWith(".mp4") || videoUrl.endsWith(".webm")) && (
                            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 space-y-2">
                              <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                                <Video className="h-3.5 w-3.5 text-primary" />
                                Video Preview (Yuklangan fayl):
                              </span>
                              <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden">
                                <video
                                  src={videoUrl}
                                  controls
                                  className="w-full h-full rounded-xl bg-black"
                                />
                              </div>
                            </div>
                          )}

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                              Qisqacha matn (Excerpt)
                            </label>
                            <input
                              type="text"
                              value={excerpt}
                              onChange={(e) => setExcerpt(e.target.value)}
                              placeholder="Postning qisqacha mazmuni (agar bo'sh qolsa matndan olinadi)"
                              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                              Post matni *
                            </label>
                            <textarea
                              required
                              rows={6}
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="Batafsil matnni kiriting..."
                              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50 resize-y"
                            />
                          </div>

                          {submitError && (
                            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                              <AlertCircle className="h-5 w-5 shrink-0" />
                              <span>{submitError}</span>
                            </div>
                          )}

                          {submitSuccess && (
                            <div className="flex items-center gap-2 rounded-xl bg-accent-green/10 border border-accent-green/20 p-4 text-sm text-accent-green">
                              <CheckCircle className="h-5 w-5 shrink-0" />
                              <span>Yangilik muvaffaqiyatli saqlanib, GitHub&apos;ga yuklandi!</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={submitting || uploadingImage || uploadingVideo}
                            className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {(submitting || uploadingImage || uploadingVideo) && <Loader2 className="h-4 w-4 animate-spin" />}
                            {editId ? "Yangilash va GitHub'ga yuklash" : "Saqlash va GitHub'ga yuklash"}
                          </button>
                        </form>
                      </GlassCard>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* EXISTING NEWS LIST */}
                <div className="space-y-4">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-text-soft" />
                    Mavjud yangiliklar ro&apos;yxati
                  </h3>

                  {loadingNews ? (
                    <div className="flex flex-col items-center py-12 text-text-muted">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                      <p className="text-sm">Yuklanmoqda...</p>
                    </div>
                  ) : newsList.length === 0 ? (
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center text-text-muted text-sm">
                      Hozircha hech qanday yangiliklar qo&apos;shilmagan.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {newsList.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-4 overflow-hidden">
                            {item.image ? (
                              <div className="relative h-14 w-20 shrink-0 rounded-lg overflow-hidden border border-white/10">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text-muted">
                                <ImageIcon className="h-5 w-5" />
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <h4 className="font-semibold text-white truncate text-sm sm:text-base">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {item.date}
                                </span>
                                {item.category && (
                                  <span className="rounded bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-primary text-[10px] font-medium">
                                    {item.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleEditClick(item)}
                              disabled={submitting}
                              className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/25 transition-colors disabled:opacity-50"
                              title="Yangilikni tahrirlash"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmItem({ id: item.id, title: item.title })}
                              disabled={submitting}
                              className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                              title="Yangilikni o'chirish"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TEACHERS MANAGEMENT VIEW */}
            {currentView === "teachers" && (
              <div className="space-y-6">
                {/* View Header */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentView("dashboard");
                      setShowTeacherForm(false);
                    }}
                    className="inline-flex items-center gap-2 text-sm text-text-soft hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Panelga qaytish
                  </button>

                  {!showTeacherForm && (
                    <button
                      onClick={() => setShowTeacherForm(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-blue-500 hover:shadow-lg transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      Pedagog qo&apos;shish
                    </button>
                  )}
                </div>

                {/* ADD/EDIT TEACHER FORM CONTAINER */}
                <AnimatePresence>
                  {showTeacherForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <GlassCard gradientBorder hover={false} className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white flex items-center gap-2">
                            {teacherEditId ? <Pencil className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
                            {teacherEditId ? "Pedagog ma'lumotlarini tahrirlash" : "Yangi pedagog qo&apos;shish"}
                          </h2>
                          <button
                            type="button"
                            onClick={() => {
                              setShowTeacherForm(false);
                              setTeacherEditId(null);
                              setTeacherName("");
                              setTeacherPosition("");
                              setTeacherSpecialty("");
                              setTeacherExperience("");
                              setTeacherDescription("");
                              setTeacherImageUrl("");
                              setTeacherImagePreview(null);
                              setSubmitError("");
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-text-soft hover:bg-white/10 hover:text-white transition-colors"
                          >
                            Bekor qilish
                          </button>
                        </div>

                        <form onSubmit={handleSubmitTeacher} className="space-y-6">
                          
                          {/* Image Upload Input */}
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                              Pedagog rasmi (Kvadrat ko&apos;rinishida bo&apos;lishi tavsiya etiladi)
                            </label>
                            
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                              <div 
                                onClick={() => teacherFileInputRef.current?.click()}
                                onDragOver={handleTeacherDragOver}
                                onDragLeave={handleTeacherDragLeave}
                                onDrop={handleTeacherDrop}
                                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 w-full md:w-64 aspect-square cursor-pointer transition-all text-center ${
                                  isDraggingTeacher 
                                    ? "border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/10" 
                                    : "border-white/10 hover:border-primary/50 bg-white/5"
                                }`}
                              >
                                {uploadingTeacherImage ? (
                                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                ) : (
                                  <>
                                    <ImageIcon className={`h-8 w-8 mb-2 transition-colors ${isDraggingTeacher ? "text-primary animate-pulse" : "text-text-muted"}`} />
                                    <span className="text-xs font-semibold text-text-soft">
                                      {isDraggingTeacher ? "Rasm faylini shu yerga tashlang" : "Rasm yuklash uchun bosing yoki surib tashlang"}
                                    </span>
                                    <span className="text-[10px] text-text-muted mt-1">PNG, JPG, JPEG (Maks. 5MB)</span>
                                  </>
                                )}
                              </div>
                              <input
                                type="file"
                                ref={teacherFileInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={handleTeacherImageChange}
                              />

                              {teacherImagePreview && (
                                <div className="relative aspect-square w-full md:w-64 rounded-2xl overflow-hidden border border-white/10">
                                  <Image
                                    src={teacherImagePreview}
                                    alt="Teacher Preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Inputs Row */}
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                F.I.SH. (To&apos;liq ism-sharifi) *
                              </label>
                              <input
                                type="text"
                                required
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                                placeholder="Misol uchun: Eshmatov Toshmat"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                Lavozimi (Texnikumdagi vazifasi) *
                              </label>
                              <input
                                type="text"
                                required
                                value={teacherPosition}
                                onChange={(e) => setTeacherPosition(e.target.value)}
                                placeholder="Misol uchun: Kafedra mudiri, O'qituvchi"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                Mutaxassisligi (Mutaxassislik yo&apos;nalishi)
                              </label>
                              <input
                                type="text"
                                value={teacherSpecialty}
                                onChange={(e) => setTeacherSpecialty(e.target.value)}
                                placeholder="Misol uchun: Kardiolog, Hamshiralik ishi nazariyasi"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                                Ish staji (Tajribasi)
                              </label>
                              <input
                                type="text"
                                value={teacherExperience}
                                onChange={(e) => setTeacherExperience(e.target.value)}
                                placeholder="Misol uchun: 10 yillik tajriba"
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                              Pedagog haqida batafsil ma&apos;lumot / Tarjimai hol
                            </label>
                            <textarea
                              rows={4}
                              value={teacherDescription}
                              onChange={(e) => setTeacherDescription(e.target.value)}
                              placeholder="Pedagog haqida qisqacha ma'lumot kiriting..."
                              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary/50 resize-y"
                            />
                          </div>

                          {submitError && (
                            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                              <AlertCircle className="h-5 w-5 shrink-0" />
                              <span>{submitError}</span>
                            </div>
                          )}

                          {submitSuccess && (
                            <div className="flex items-center gap-2 rounded-xl bg-accent-green/10 border border-accent-green/20 p-4 text-sm text-accent-green">
                              <CheckCircle className="h-5 w-5 shrink-0" />
                              <span>Pedagog ma&apos;lumotlari muvaffaqiyatli saqlanib, GitHub&apos;ga yuklandi!</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={submitting || uploadingTeacherImage}
                            className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {(submitting || uploadingTeacherImage) && <Loader2 className="h-4 w-4 animate-spin" />}
                            {teacherEditId ? "Yangilash va GitHub'ga yuklash" : "Saqlash va GitHub'ga yuklash"}
                          </button>
                        </form>
                      </GlassCard>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* EXISTING TEACHERS LIST */}
                <div className="space-y-4">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-text-soft" />
                    Mavjud pedagoglar ro&apos;yxati
                  </h3>

                  {loadingTeachers ? (
                    <div className="flex flex-col items-center py-12 text-text-muted">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                      <p className="text-sm">Yuklanmoqda...</p>
                    </div>
                  ) : teachersList.length === 0 ? (
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center text-text-muted text-sm">
                      Hozircha hech qanday pedagoglar qo&apos;shilmagan.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {teachersList.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-4 overflow-hidden">
                            {item.photo ? (
                              <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-white/10">
                                <Image
                                  src={item.photo}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-text-muted">
                                <UserIcon className="h-5 w-5" />
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <h4 className="font-semibold text-white truncate text-sm sm:text-base">
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-2.5 text-xs text-text-muted mt-1 flex-wrap">
                                <span className="text-primary font-medium">{item.position}</span>
                                {item.specialty && (
                                  <>
                                    <span>·</span>
                                    <span>{item.specialty}</span>
                                  </>
                                )}
                                {item.experience && (
                                  <>
                                    <span>·</span>
                                    <span className="opacity-80">{item.experience}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleTeacherEditClick(item)}
                              disabled={submitting}
                              className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/25 transition-colors disabled:opacity-50"
                              title="Tahrirlash"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setTeacherDeleteConfirmItem({ id: item.id, name: item.name })}
                              disabled={submitting}
                              className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                              title="O'chirish"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* SYNC OVERLAY / LOADER */}
            {submitting && syncStatus && (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark/85 backdrop-blur-md px-6 text-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-lg font-medium text-white">{syncStatus}</p>
                <p className="text-xs text-text-muted mt-2 max-w-sm">
                  Ushbu jarayon fayllarni saqlaydi hamda GitHub repository&apos;ga avtomatik push qiladi. Iltimos kuting...
                </p>
              </div>
            )}

            {/* CUSTOM DELETE CONFIRMATION MODAL */}
            <AnimatePresence>
              {deleteConfirmItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/80 backdrop-blur-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-bg-dark to-white/5 p-6 shadow-2xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-4">
                      <AlertCircle className="h-6 w-6 animate-bounce" />
                    </div>
                    
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white mb-2">
                      Yangilikni o&apos;chirish
                    </h3>
                    
                    <p className="text-sm text-text-soft leading-relaxed mb-6">
                      Haqiqatan ham <strong className="text-white">&quot;{deleteConfirmItem.title}&quot;</strong> yangiligini o&apos;chirmoqchimisiz? Bu amal avtomatik ravishda GitHub repository&apos;ga yuklanadi va buni qaytarib bo&apos;lmaydi.
                    </p>
                    
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmItem(null)}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-text-soft hover:bg-white/10 hover:text-white transition-colors"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const { id } = deleteConfirmItem;
                          setDeleteConfirmItem(null);
                          handleDeleteNews(id);
                        }}
                        className="rounded-xl bg-red-500 hover:bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-500/20 transition-colors"
                      >
                        O&apos;chirish
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* CUSTOM TEACHER DELETE CONFIRMATION MODAL */}
            <AnimatePresence>
              {teacherDeleteConfirmItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/80 backdrop-blur-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-bg-dark to-white/5 p-6 shadow-2xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-4">
                      <AlertCircle className="h-6 w-6 animate-bounce" />
                    </div>
                    
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white mb-2">
                      Pedagog ma&apos;lumotlarini o&apos;chirish
                    </h3>
                    
                    <p className="text-sm text-text-soft leading-relaxed mb-6">
                      Haqiqatan ham <strong className="text-white">&quot;{teacherDeleteConfirmItem.name}&quot;</strong> pedagog ma&apos;lumotlarini o&apos;chirmoqchimisiz? Bu amal avtomatik ravishda GitHub repository&apos;ga yuklanadi va buni qaytarib bo&apos;lmaydi.
                    </p>
                    
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setTeacherDeleteConfirmItem(null)}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-text-soft hover:bg-white/10 hover:text-white transition-colors"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const { id } = teacherDeleteConfirmItem;
                          setTeacherDeleteConfirmItem(null);
                          handleDeleteTeacher(id);
                        }}
                        className="rounded-xl bg-red-500 hover:bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-500/20 transition-colors"
                      >
                        O&apos;chirish
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

      </div>
    </main>
  );
}
