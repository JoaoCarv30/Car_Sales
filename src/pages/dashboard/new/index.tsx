import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelHeader";

import { FiUpload } from "react-icons/fi";

import { useForm } from 'react-hook-form';
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("Campo nome é obrigatório"),
  model: z.string().nonempty("Campo modelo é obrigatório"),
  year: z.string().nonempty("Campo ano é obrigatório"),
  km: z.string().nonempty("Campo km é obrigatório"),
  price: z.string().nonempty("Campo preço é obrigatório"),
  city: z.string().nonempty("Campo cidade é obrigatório"),
  whatsapp: z.string().nonempty("Campo whatsapp é obrigatório").refine(
    (value) => /^\d{11,12}$/.test(value), {
    message: "Número de telefone inválido"
  }
  ),
  description: z.string().nonempty("Campo descrição é obrigatório"),
})

type FormData = z.infer<typeof schema>;

export function New() {

  function onSubmit(data: FormData) {
    console.log(data);
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });
  return (
    <Container>
      <DashboardHeader />
      <div
        className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2"
      >
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48"  >
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input type="file" accept="image/*" className="opacity-0 cursor-pointer" />
          </div>
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">

        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do Carro</p>
            <Input
              type="text"
              placeholder="Ex: Onix 1.0"
              name="name"
              register={register}
              error={errors.name?.message}
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do Carro</p>
            <Input
              type="text"
              placeholder="Ex: 1.0 flex plus Manual"
              name="model"
              register={register}
              error={errors.model?.message}
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano do Carro</p>
              <Input
                type="text"
                placeholder="2016/2024..."
                name="year"
                register={register}
                error={errors.year?.message}
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">KM rodados</p>
              <Input
                type="text"
                placeholder="Ex: 23.900..."
                name="km"
                register={register}
                error={errors.km?.message}
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone / Whatsapp</p>
              <Input
                type="text"
                placeholder="(XX) XXXXXXXX"
                name="whatsapp"
                register={register}
                error={errors.whatsapp?.message}
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                placeholder="Ex: Xique-Xique-Bahia"
                name="city"
                register={register}
                error={errors.city?.message}
              />
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              type="text"
              placeholder="Ex: 14.500"
              name="price"
              register={register}
              error={errors.price?.message}
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              {...register("description")}
              className="w-full border-2 rounded-md h-24 px-2"
              placeholder="Descrição do carro"
            />
            {errors.description && <span className="text-red-500 mb-1">{errors.description.message}</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white font-medium h-10 rounded-md p-2 mt-2"
          >
            Cadastrar
          </button>



        </form>

      </div>
    </Container>
  )
}