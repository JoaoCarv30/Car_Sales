import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Container } from '../../components/container';
import { Input } from '../../components/input';

//VALIDAÇÃO DE FORMULÁRIO
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const schema = z.object({
  name: z.string().nonempty("Campo nome é obrigatório"),
  email: z.string().email("Insira um email válido").nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório").min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(
    {
      resolver: zodResolver(schema),
      mode: "onChange"
    }
  );

  function onsubmit(data: FormData) {
    console.log(data);
  }


  return (
    <Container>
      <div className='w-full min-h-screen flex items-center justify-center flex-col gap-4'>
        <Link to='/' className='mb-6 max-w-sm w-full'>
          <img
            src={logoImg}
            alt='Logo'
            className='w-full'
          />
        </Link>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className='bg-white max-w-xl w-full rounded-lg p-4'
        >
          <div className='mb-3'>
            <Input
              type='text'
              placeholder='Digite seu nome completo'
              name='name'
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className='mb-3'>
            <Input
              type='email'
              placeholder='Digite seu Email'
              name='email'
              error={errors.email?.message}
              register={register}
            />
          </div>


          <div className='mb-3'>
            <Input
              type='password'
              placeholder='Digite sua senha'
              name='password'
              error={errors.password?.message}
              register={register}
            />
          </div>


          <button
            className='bg-zinc-900 w-full rounded-md h-11 text-white h-10 font-medium'
            type='submit'
          >Acessar</button>

        </form>
        <Link to='/login' className='text-zinc-900'>Já tem uma conta? Acesse</Link>

      </div>
    </Container>
  )
}