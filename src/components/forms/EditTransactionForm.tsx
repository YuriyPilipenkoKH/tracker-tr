

import React from 'react'
import { useForm } from 'react-hook-form'
import { Transaction, transactionSchema, updatingSchemaType } from '../../models/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalStore } from '../../store/useModalStore'
import { Input_DU, Label_DU } from './Forms.styled'
import { cn } from '../../lib/cn'
import { useFinanceStore } from '../../store/useFinanceStore'
import { ZodError } from '../button/Button.styled'
import { Button } from '../button/Button'
import { LuCircleX, LuPenLine, LuRefreshCw } from 'react-icons/lu'
import toast from 'react-hot-toast'

interface EditTransactionFormProps {
  edit: boolean
  setEdit: React.Dispatch<boolean>
} 

const EditTransactionForm: React.FC<EditTransactionFormProps> = ({
  edit, setEdit
}) => {
  const {selectedTransaction, onModalClose} = useModalStore()
   const { nameError, clearAnyError, updateTransaction} = useFinanceStore()

   const {
      register, 
      handleSubmit,
      formState,
      reset,
      clearErrors,
    } = useForm<Transaction>({
      defaultValues: {  
        amount:selectedTransaction?.amount,
        name: selectedTransaction?.name,
        description: selectedTransaction?.description,
         },
          mode:'all',
          resolver: zodResolver(transactionSchema), })
      const {
        errors,
        isDirty,
        isValid ,
        isSubmitting,
        isLoading 
      } = formState

    const onSubmit = async (data: updatingSchemaType) => {
      console.log(data);
      const finalData = {
        ...data,
        _id:selectedTransaction?._id,
      }
      console.log('finalAmount',finalData)
      const response = await updateTransaction(finalData)
      if(response?.success){
        console.log(response);
        toast.success(response.message)
        // console.log(response.message);
        clearAnyError({error: 'nameError'})
        onModalClose()
      }
    }

    const handleNameChange =   () => {
      if( nameError ) clearAnyError({error: 'nameError'})
    }
  return (
    <form  
    onSubmit={handleSubmit(onSubmit)}
    className='relative flex flex-col w-full gap-3 px-1 pt-12 pb-6'
    autoComplete="off"
    noValidate>

      <Label_DU className={cn('formLabel  flex  gap-1')}>amount    
      <Input_DU 
          disabled
          className={cn('grow ' ,  )}
          {...register('amount', )}    />
      </Label_DU>
      <Label_DU className={cn('formLabel  flex gap-1')}>name
        <Input_DU 
          className={cn('grow ' )}
          {...register('name', {
            onChange: handleNameChange
          } )}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          disabled={!edit}
          />
      </Label_DU>
      {errors.name && <ZodError >{errors.name.message}</ZodError>}
      {nameError && <ZodError  >{nameError}</ZodError>}

      <Label_DU className={cn('formLabel  flex  gap-1')}>description
        <Input_DU 
          className={cn('grow 0' )}
          {...register('description', )}
          placeholder=	{( isSubmitting )? "Processing" : 'description'}
          disabled={!edit}
          />
      </Label_DU>
      {errors.description && <ZodError >{errors.description.message}</ZodError>}
      {edit && (
      <Button
        className='flex w-full gap-5 mt-auto btn btn-active btn-primary'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid }
            >
      { isSubmitting &&  <LuRefreshCw className='size-6 animate-spin' />}      
      { isLoading  ? "Sending.." :  "Send" }
      </Button>
      )}

      <button 
      type='button'
      onClick ={() => setEdit(!edit)}
      className='btn btn-ghost absolute top-[-8px] right-5 ' >
          {!edit ?  <LuPenLine  /> : <LuCircleX  />}
      </button>
    </form>
  )
}

export default EditTransactionForm

// 