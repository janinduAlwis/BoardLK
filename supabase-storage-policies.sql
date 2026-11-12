-- Development policies for the BoardLK hybrid Firebase + Supabase setup.
-- Firebase auth users are anonymous to Supabase Storage, so uploads use anon.
-- Replace this with a Firebase-token-verified Edge Function before production.

drop policy if exists "property images can be uploaded" on storage.objects;
drop policy if exists "property images can be replaced" on storage.objects;
drop policy if exists "property images are publicly readable" on storage.objects;

create policy "property images can be uploaded"
on storage.objects
for insert
to anon
with check (bucket_id = 'property-images');

create policy "property images can be replaced"
on storage.objects
for update
to anon
using (bucket_id = 'property-images')
with check (bucket_id = 'property-images');

create policy "property images are publicly readable"
on storage.objects
for select
to public
using (bucket_id = 'property-images');
