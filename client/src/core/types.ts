export interface Trip {
    createdAt: string; // ISO строка даты
    description: string; // Описание документа
    documentId: string; // Уникальный идентификатор документа
    duration: number; // Длительность (возможно, в секундах или минутах)
    id: number; // Идентификатор записи
    publishedAt: string; // Дата публикации (ISO строка)
    title: string; // Заголовок документа
    updatedAt: string; // Дата последнего обновления (ISO строка)
    photo: {
      url: string,
    }
  }