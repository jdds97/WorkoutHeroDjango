
import {signInAction} from '../../server/actions';
import {Button} from '@/components/ui/button';

export function SignIn({
    provider,
    ...props
}: {provider?: string|undefined}) {
    return (
        <form
            action={signInAction}
            className="p-4"
        >
            <Button variant="secondary" size={'default'}>Iniciar sesión</Button>
        </form>
    );
}

