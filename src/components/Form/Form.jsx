import './Form.css';
import { useForm, FormProvider } from 'react-hook-form';


export default function Form({ children }) {
    const { handleSubmit, reset, formState: { isValid, errors }, register } = useForm({
        mode: 'onChange'

    });

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }

    return (
        <FormProvider {...{ register, formState: { isValid, errors } }}>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className='Form' autoComplete="off">
                {children}
            </form>
        </FormProvider>
    )
}
