const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://warancqgeazmashndner.supabase.co',
  'sb_publishable_BALcs4WfEG-34C8LKyIcMA_EJAG6-ge'
);

async function createAdminUser() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@elenabenitez.com',
      password: 'admin123456'
    });

    if (error) {
      console.log('Error creando usuario:', error.message);
    } else {
      console.log('Usuario creado exitosamente:', data.user?.email);
      console.log('Por favor, verifica tu email para confirmar la cuenta');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

createAdminUser();