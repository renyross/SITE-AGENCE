-- Apply in the selected Supabase project's SQL editor; not executed automatically.
create table if not exists public.agency_articles (
 slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 payload jsonb not null check (payload->>'slug' = slug),
 published boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.agency_articles enable row level security;
revoke all on public.agency_articles from anon, authenticated;
grant select on public.agency_articles to anon, authenticated;
drop policy if exists published_articles on public.agency_articles;
create policy published_articles on public.agency_articles for select to anon, authenticated using (published = true);
-- Editing uses Supabase's authenticated project dashboard, never browser service keys.
