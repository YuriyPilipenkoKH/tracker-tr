import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, profileSchemaType } from '../../models/profileSchema';
import { cn } from '../../lib/cn';
import { useEffect, useState } from 'react';
import { LuBuilding2, LuMail, LuPhone, LuRefreshCw, LuSquarePen, LuSquareX, LuUser } from 'react-icons/lu';
import { Input_DU, Label_DU } from './Forms.styled';
import { ZodError } from '../button/Button.styled';
import { Button, FlatButton } from '../button/Button';
import { useAuthStore } from '../../store/useAuthStore';


const ProfileForm = () => {

  const { authUser, updateProfile} = useAuthStore()
  const [logError, setLogError] = useState<string>('')
  const [anable, setAnable] = useState<boolean>(false)
  const {
    register, 
    handleSubmit,
    reset,
    formState
  } = useForm<profileSchemaType >({
    mode:'all',
    defaultValues: {
      name: authUser?.name,
      email: authUser?.email,
      phone: authUser?.phone,
      city: authUser?.city 
    },
  resolver: zodResolver(profileSchema), })
  const {
    errors,
    isDirty,
    isSubmitting,
  } = formState

  const onSubmit = async (data: profileSchemaType) => {
    console.log(data);
    const response = await updateProfile(data)
    setAnable(false)
    if(response){
      resetToDefault()
    }
    }
    const resetToDefault = () => {
      reset({
        name: authUser?.name || '',
        email: authUser?.email || '',
        phone: authUser?.phone || '',
        city: authUser?.city || '',
      });
    }
    useEffect(() => {
      if (!anable)  resetToDefault() 
    }, [anable]);

  const handleInputChange =   () => {
    if(logError) setLogError('')
      }
  return (
    <div className="space-y-6 ">

    <form onSubmit={handleSubmit(onSubmit)}
        className='relative flex flex-col gap-3 w-full py-5'
        autoComplete="off"
        noValidate>
          <FlatButton
          type='button' 
          className='absolute btn btn-ghost right-0 top-[-12px]'
          onClick={()=>setAnable(!anable)}>
           { anable
           ? <LuSquareX className="w-4 h-4" />
           : <LuSquarePen  className="w-4 h-4" />}
          </FlatButton>

        <Label_DU className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <LuUser className="w-4 h-4" />
          Full Name
        </div>
          <Input_DU 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('name',{ onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'email'}
            disabled = {!anable}/>
        </Label_DU>
          {errors.name && <ZodError >{errors.name.message}</ZodError>}
          
        <Label_DU className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <LuMail className="w-4 h-4" />
          Email Address
        </div>
          <Input_DU 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('email', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'email'}
            disabled = {!anable}/>
        </Label_DU>
          {errors.email && <ZodError >{errors.email.message}</ZodError>}

        <Label_DU className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <LuPhone  className="w-4 h-4" />
          Phone Number
        </div>
          <Input_DU 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('phone', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'phone'}
            disabled = {!anable}/>
        </Label_DU>
          {errors.phone && <ZodError >{errors.phone.message}</ZodError>}

        <Label_DU className={cn('formLabel  flex flex-col  gap-1')}>
        <div className="text-sm  flex items-center gap-2">
          <LuBuilding2   className="w-4 h-4" />
          City
        </div>
          <Input_DU 
            className={cn('grow input input-bordered  focus:ring focus:border-blue-500 ' )}
            {...register('city', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting )? "Processing" : 'City'}
            disabled = {!anable}/>
        </Label_DU>
          {errors.city && <ZodError >{errors.city.message}</ZodError>}
      {anable && (
      <Button 
        type='submit'
        className={cn('btn btn-primary mt-1 flex gap-5',
          !anable && 'visually-hidden'
        )} 
        disabled ={isSubmitting || !isDirty  } 
        >
        { isSubmitting &&  <LuRefreshCw className='size-6 animate-spin' />}
        { isSubmitting  ? "Sending.." :  " Save" }
      </Button>
      )}    
    </form>
  </div>
  )
}

export default ProfileForm