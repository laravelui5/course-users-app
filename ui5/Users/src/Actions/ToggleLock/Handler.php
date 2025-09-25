<?php

namespace Pragmatiqu\Users\Actions\ToggleLock;

use App\Models\User;
use Doctrine\DBAL\ParameterType;
use LaravelUi5\Core\Attributes\Parameter;
use LaravelUi5\Core\Enums\ParameterSource;
use LaravelUi5\Core\Enums\ValueType;
use LaravelUi5\Core\Ui5\AbstractActionHandler;

#[Parameter(
    name: 'user',
    uriKey: 'user',
    type: ValueType::Model,
    source: ParameterSource::Path,
    model: User::class
)]
class Handler extends AbstractActionHandler
{
    public function execute(): array
    {
        /** @var User $user */
        $user = $this->args()->get('user');
        $user->locked = !$user->locked;
        $user->save();

        return [
            'status' => 'Success',
            'message' => 'The action was executed successfully.'
        ];
    }
}
