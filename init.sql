CREATE TABLE cards (
    id UUID PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    interval INTEGER NOT NULL DEFAULT 0,
    repetition INTEGER NOT NULL DEFAULT 0,
    easiness_factor FLOAT NOT NULL DEFAULT 2.5,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    date_added TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_next_review TIMESTAMPTZ NOT NULL
);
