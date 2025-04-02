// Mock datasets for the marketplace
export const mockDatasets = [
    {
      id: 1,
      name: "Street Scene Images Dataset",
      description: "A collection of 1,000 high-resolution street scene images for computer vision training, annotated with object labels.",
      price: 150,
      creator: "UrbanAI Labs",
      cid: "QmX7bVfcBnhfnRDnUR5kX9HYwUxJYHapxe5NYuzY5FPUz8",
      createdAt: "2025-03-15",
      fileSize: "1.2 GB",
      imageUrl: "https://placehold.co/600x400/667eea/ffffff?text=Street+Scenes"
    },
    {
      id: 2,
      name: "Restaurant Reviews Dataset",
      description: "10,000 restaurant reviews with sentiment labeling and geographic metadata for natural language processing.",
      price: 85,
      creator: "FoodTech Data",
      cid: "QmYpR3SZzXgXJo7VFpXbXHmN8vzKJ7D9C6JQvzjTqBxZ7r",
      createdAt: "2025-03-10",
      fileSize: "450 MB",
      imageUrl: "https://placehold.co/600x400/f6ad55/ffffff?text=Restaurant+Reviews"
    },
    {
      id: 3,
      name: "Medical Imaging Dataset",
      description: "Anonymized medical scans with expert annotations for healthcare AI research, fully HIPAA compliant.",
      price: 300,
      creator: "MedAI Research",
      cid: "QmUw6Qb9hKSxQmFfJgCpU6ARsmiJT5qYZ7vS6KNsJ9QKe2",
      createdAt: "2025-03-05",
      fileSize: "3.5 GB",
      imageUrl: "https://placehold.co/600x400/4fd1c5/ffffff?text=Medical+Imaging"
    },
    {
      id: 4,
      name: "Financial News Corpus",
      description: "Five years of financial news articles from major sources, categorized and dated for trend analysis.",
      price: 220,
      creator: "FinData Solutions",
      cid: "QmVhqG8XcZhFEHrTVZD8CnRKCbYCeNsRj8CvdMdDp7KvXb",
      createdAt: "2025-02-28",
      fileSize: "800 MB",
      imageUrl: "https://placehold.co/600x400/805ad5/ffffff?text=Financial+News"
    },
    {
      id: 5,
      name: "Conversational AI Dialogues",
      description: "Human-annotated dialogue pairs for training conversational AI systems, covering multiple domains.",
      price: 175,
      creator: "DialogueTech",
      cid: "QmTmZrXEqM9KwWj3nND7kGCQYYQq7zBnUnLM8XZpCzrH5M",
      createdAt: "2025-03-18",
      fileSize: "650 MB",
      imageUrl: "https://placehold.co/600x400/d53f8c/ffffff?text=AI+Dialogues"
    }
  ];
  
  // Mock purchased datasets for the buyer dashboard
  export const mockPurchasedDatasets = [
    {
      id: 2,
      name: "Restaurant Reviews Dataset",
      purchaseDate: "2025-03-19",
      price: 85,
      cid: "QmYpR3SZzXgXJo7VFpXbXHmN8vzKJ7D9C6JQvzjTqBxZ7r"
    },
    {
      id: 5,
      name: "Conversational AI Dialogues",
      purchaseDate: "2025-03-18",
      price: 175,
      cid: "QmTmZrXEqM9KwWj3nND7kGCQYYQq7zBnUnLM8XZpCzrH5M"
    }
  ];
  
  // Mock uploaded datasets for the creator dashboard
  export const mockUploadedDatasets = [
    {
      id: 6,
      name: "Urban Soundscapes Dataset",
      description: "High-quality urban environmental audio recordings for acoustic modeling and sound classification.",
      price: 130,
      createdAt: "2025-03-12",
      sales: 3,
      earnings: 390,
      cid: "QmR8mVq1Ew7vQJHE3FNVm9rwjpqJyNNPx6uCRgzrTgUAZ9"
    },
    {
      id: 7,
      name: "Fashion Product Images",
      description: "10,000 fashion product images with attribute tags for e-commerce and fashion AI applications.",
      price: 200,
      createdAt: "2025-03-05",
      sales: 5,
      earnings: 1000,
      cid: "QmVZxjdCLrBHSwhpVTmK9LsPyBMPP7wJ9qQgvTprJfRvZJ"
    }
  ];