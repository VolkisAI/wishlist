public
│
├── wishlists
│   ├── Columns:
│   │   ├── id TEXT
│   │   ├── family_name TEXT
│   │   ├── children TEXT[]
│   │   ├── note TEXT
│   │   ├── created_at TIMESTAMPTZ
│   │   ├── responses_count INTEGER
│   │   ├── user_id UUID
│   │   └── user_email TEXT
│   ├── RLS Policies:
│   │   ├── "Users can view own wishlists"
│   │   │   ├── Action: SELECT
│   │   │   └── Definition: auth.uid() = user_id
│   │   ├── "Users can create wishlists"
│   │   │   ├── Action: INSERT
│   │   │   └── Check: auth.uid() = user_id
│   │   ├── "Users can update own wishlists"
│   │   │   ├── Action: UPDATE
│   │   │   └── Definition: auth.uid() = user_id
│   │   └── "Users can delete own wishlists"
│   │       ├── Action: DELETE
│   │       └── Definition: auth.uid() = user_id
│   │
│   └── responses
│       ├── Columns:
│       │   ├── id UUID
│       │   ├── wishlist_id TEXT
│       │   ├── child_name TEXT
│       │   ├── message TEXT
│       │   └── created_at TIMESTAMPTZ
│       ├── RLS Policies:
│       │   ├── "Users can view responses to own wishlists"
│       │   │   ├── Action: SELECT
│       │   │   └── Definition: EXISTS (SELECT 1 FROM public.wishlists WHERE wishlists.id = responses.wishlist_id AND wishlists.user_id = auth.uid())
│       │   └── "Anyone can create responses"
│       │       ├── Action: INSERT
│       │       └── Check: true
│
└── auth
    └── users
        ├── Columns:
        │   ├── instance_id UUID
        │   ├── id UUID
        │   ├── aud TEXT
        │   ├── role TEXT
        │   ├── email TEXT
        │   ├── encrypted_password TEXT
        │   ├── email_confirmed_at TIMESTAMPTZ
        │   ├── invited_at TIMESTAMPTZ
        │   ├── confirmation_token TEXT
        │   ├── confirmation_sent_at TIMESTAMPTZ
        │   ├── recovery_token TEXT
        │   ├── recovery_sent_at TIMESTAMPTZ
        │   ├── email_change_token_new TEXT
        │   ├── email_change TEXT
        │   ├── email_change_sent_at TIMESTAMPTZ
        │   ├── last_sign_in_at TIMESTAMPTZ
        │   ├── raw_app_meta_data JSONB
        │   ├── raw_user_meta_data JSONB
        │   ├── is_super_admin BOOLEAN
        │   ├── created_at TIMESTAMPTZ
        │   ├── updated_at TIMESTAMPTZ
        │   ├── phone TEXT
        │   ├── phone_confirmed_at TIMESTAMPTZ
        │   ├── phone_change TEXT
        │   ├── phone_change_token TEXT
        │   ├── phone_change_sent_at TIMESTAMPTZ
        │   ├── confirmed_at TIMESTAMPTZ
        │   ├── email_change_token_current TEXT
        │   ├── email_change_confirm_status SMALLINT
        │   ├── banned_until TIMESTAMPTZ
        │   ├── reauthentication_token TEXT
        │   ├── reauthentication_sent_at TIMESTAMPTZ
        │   ├── is_sso_user BOOLEAN
        │   ├── deleted_at TIMESTAMPTZ
        │   └── is_anonymous BOOLEAN
        ├── RLS Policies:
        │   └── No specific policies defined for this table.