import type { SiteContent } from "@/lib/settings";

// Edit this file to change the website content in code.
// Keep the object shape the same, then restart or let Vite hot reload the app.
export const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "6 Months of Us",
  heroDesc: "Half a year of laughter, tears, and a love that feels like a movie. This is the story of how we became us.",
  heroImageUrl: "",
  galleryPhotos: [
    { url: "/images/gallery/gallery-01.jpg", caption: "Thanks to the SIH 😭" },
    { url: "/images/gallery/gallery-02.jpg", caption: "18 November" },
    { url: "/images/gallery/gallery-03.jpg", caption: "December memories" },
    { url: "/images/gallery/gallery-04.jpg", caption: "January moments" },
    { url: "/images/gallery/gallery-05.jpg", caption: "5 April" },
    { url: "/images/gallery/gallery-06.jpg", caption: "4 May" },
    { url: "/images/gallery/gallery-07.jpg", caption: "April afternoon" },
    { url: "/images/gallery/gallery-08.jpg", caption: "9 April" },
    { url: "/images/gallery/gallery-09.jpg", caption: "12 April" },
    { url: "/images/gallery/gallery-10.jpg", caption: "13 April" },
    { url: "/images/gallery/gallery-11.jpg", caption: "20 May" },
    { url: "/images/gallery/gallery-12.jpg", caption: "22 April" },
  ],
  playlistSongs: [
    { num: 1, title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:22", seconds: 262, src: "/audio/tum-hi-ho.mp3", gradient: "from-rose-900 via-purple-900 to-indigo-900" },
    { num: 2, title: "Raataan Lambiyan", artist: "Jubin Nautiyal", duration: "3:47", seconds: 227, src: "/audio/raataan-lambiyan.mp3", gradient: "from-pink-900 via-rose-800 to-red-900" },
    { num: 3, title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", duration: "3:59", seconds: 239, src: "/audio/tera-ban-jaunga.mp3", gradient: "from-indigo-900 via-purple-800 to-pink-900" },
    { num: 4, title: "Kesariya", artist: "Arijit Singh", duration: "4:28", seconds: 268, src: "/audio/kesariya.mp3", gradient: "from-amber-900 via-orange-900 to-rose-900" },
  ],
  memories: [
    { key: "firstMeeting", title: "First Meeting", gradient: "from-rose-900 to-pink-800", imageUrl: "/images/gallery/gallery-01.jpg", desc: "Thanks to the SIH 😭", date: "Aug 2025", quote: "The universe conspired to bring two strangers together." },
    { key: "firstDate", title: "First Date", gradient: "from-red-900 to-rose-700", imageUrl: "/images/gallery/memory-first-date.png", desc: "The perfect evening.", date: "Nov 2025", quote: "I knew from that first evening, this was different." },
    { key: "3months", title: "3 Months Together", gradient: "from-pink-900 to-red-800", imageUrl: "/images/gallery/gallery-05.jpg", desc: "Learning and growing.", date: "Feb 2026", quote: "Three months of choosing each other, every single day." },
    { key: "6months", title: "6 Months Together", gradient: "from-indigo-900 to-purple-800", imageUrl: "/images/gallery/gallery-11.jpg", desc: "Half a year down, forever to go.", date: "May 2026", quote: "Six months of choosing each other, every single day." },
  ],
  continueWatching: [
    { title: "Couple Bucket List", progress: 35, desc: "12 of 34 done", imageUrl: "" },
    { title: "Places To Visit", progress: 20, desc: "3 of 15 planned", imageUrl: "" },
    { title: "Movies To Watch Together", progress: 60, desc: "18 of 30 watched", imageUrl: "" },
    { title: "Cooking Date Challenge", progress: 10, desc: "2 of 20 recipes tried", imageUrl: "" },
    { title: "Long Drive Plans", progress: 45, desc: "4 of 9 drives done", imageUrl: "" },
  ],
  episodes: [
    { id: 1, title: "The First Hello", desc: "It started in August 2025. Neither of us knew that one hello would change everything.", gradient: "from-rose-900 to-red-950", imageUrl: "" },
    { id: 2, title: "Late Night Conversations", desc: "3 AM texts that stretched into sunrise. You became my favorite Contact.", gradient: "from-purple-900 to-indigo-950", imageUrl: "" },
    { id: 3, title: "Getting Attached", desc: "Suddenly, checking the phone felt different. Your name made everything better.", gradient: "from-pink-900 to-rose-950", imageUrl: "" },
    { id: 4, title: "Dating Era Begins", desc: "November 2025. The nervousness, the excitement, the magic.", gradient: "from-red-900 to-stone-900", imageUrl: "" },
    { id: 5, title: "Falling In Love", desc: "There was no single moment. It happened in a hundred small ways, all at once.", gradient: "from-fuchsia-900 to-pink-950", imageUrl: "" },
    { id: 6, title: "6 Months Later", desc: "Half a year later. Still choosing each other. Every single day.", gradient: "from-rose-800 to-indigo-900", imageUrl: "" },
  ],
  futurePlans: [
    { title: "Trip To The Mountains", desc: "Adventure awaits...", gradient: "from-blue-900 to-emerald-900", imageUrl: "" },
    { title: "Matching Outfits Day", desc: "Almost roz hi hojata h waise toh!!", gradient: "from-pink-900 to-orange-900", imageUrl: "" },
    { title: "Cooking Date", desc: "Saath me Banayenge....(Khana)", gradient: "from-red-900 to-yellow-900", imageUrl: "" },
    { title: "Stargazing Night", desc: "Just us and the universe...", gradient: "from-indigo-900 to-purple-900", imageUrl: "" },
    { title: "Future Anniversary", desc: "Year 1 is going to be magical...", gradient: "from-rose-900 to-pink-900", imageUrl: "" },
  ],
  topPicks: [
    { reason: "Because you make every day feel like a movie", reveal: "My favorite story, My favorite actress, My favorite producer, My favorite ❤️ ", imageUrl: "" },
    { reason: "Because you stayed during the hard days", reveal: "Chhod Ke na bhangne ke liye Shukriyaa Madam 👀", imageUrl: "" },
    { reason: "Recommended for hopeless romantics", reveal: "You're the one I'd choose in every universe.", imageUrl: "" },
    { reason: "Because 3 AM conversations hit different", reveal: "I love the version of me I am with you.", imageUrl: "" },
    { reason: "Because you're my favorite person", reveal: "6 months feels like forever and not long enough.", imageUrl: "" },
  ],
  timeline: [
    { date: "Aug 2025", title: "The Beginning", desc: "First hello, first laugh, first spark. Thanks to the SIH 😭", imageUrl: "/images/gallery/gallery-01.jpg" },
    { date: "Sep 2025", title: "First Conversations", desc: "Long texts, short nights, infinite smiles", imageUrl: "/images/gallery/gallery-02.jpg" },
    { date: "Oct 2025", title: "Getting Closer", desc: "Every day felt like a new adventure", imageUrl: "/images/gallery/gallery-03.jpg" },
    { date: "Nov 2025", title: "Started Dating", desc: "The nervousness, the excitement, the magic", imageUrl: "/images/gallery/gallery-04.jpg" },
    { date: "Dec 2025", title: "Falling Deep", desc: "When like turned into love", imageUrl: "/images/gallery/gallery-05.jpg" },
    { date: "Jan 2026", title: "Making Memories", desc: "Tiny moments, silly talks, and us becoming us", imageUrl: "/images/gallery/gallery-06.jpg" },
    { date: "Feb 2026", title: "3 Months", desc: "Three months of choosing each other", imageUrl: "/images/gallery/gallery-07.jpg" },
    { date: "Mar 2026", title: "Growing Together", desc: "JANAMDINNN WAALAA MAHINAAAA", imageUrl: "/images/gallery/gallery-08.jpg" },
    { date: "May 2026", title: "6 Months", desc: "Half a year. A million memories. Still us.", imageUrl: "/images/gallery/gallery-11.jpg" },
  ],
  letterTitle: "A Letter For You",
  letterText: `To the one who makes every day feel like a scene from my favorite movie...

I never thought 6 months could hold so much. So many laughs. So many late nights. So many moments that I replay when I miss you.

You walked into my life and rearranged everything, in the best possible way.

I love the way you laugh. I love the way you make everything feel lighter. I love that I get to be the one you call when something good happens, and the one you lean on when it does not.

Six months is not long enough to say everything I feel. But it is long enough to know, I would not want to be anywhere else.

Here's to us. To every chapter still unwritten.

With all my love, forever and always.`,
};
