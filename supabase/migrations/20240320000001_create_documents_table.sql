
create type document_status as enum ('pending_signature', 'signed', 'archived');

create table documents (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  file_path text not null,
  status document_status default 'pending_signature',
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  signed_at timestamp with time zone
);

-- Create a storage bucket for documents
insert into storage.buckets (id, name, public) values ('documents', 'documents', true);

-- Enable RLS
alter table documents enable row level security;

-- Create policies
create policy "Users can view their own documents"
  on documents for select
  using (auth.uid() = created_by);

create policy "Users can insert their own documents"
  on documents for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own documents"
  on documents for update
  using (auth.uid() = created_by);

-- Add storage policies
create policy "Allow authenticated users to upload documents"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'documents');

create policy "Allow authenticated users to read documents"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'documents');

