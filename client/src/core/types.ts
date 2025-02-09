export interface Trip {
    createdAt: string; // ISO строка даты
    description: string; // Описание документа
    documentId: string; // Уникальный идентификатор документа
    duration: number; // Длительность (возможно, в секундах или минутах)
    id: number; // Идентификатор записи
    publishedAt: string; // Дата публикации (ISO строка)
    title: string; // Заголовок документа
    map: string,
    updatedAt: string; // Дата последнего обновления (ISO строка)
    photo: {
      url: string,
    }
  }

  export interface Vehicle {
    name: string;
    createdAt: string;
    description: string;
    documentId: string;
    id: number;
    people_allowed: number;
    price: number;
    publishedAt: string;
    season_allowed: string | null;
    updatedAt: string;
    photo: Array<{
      url: string,
    }>
  };
  