<template>
    <section>
        <form>
            <div>
                <label for="email">
                    <input type="text" name="email" placeholder="Email">
                </label>
            </div>

            <div>
                <label for="username">
                    <input type="text" name="username" placeholder="Nom d'utilisateur">
                </label>
            </div>

            <div>
                <label for="password">
                    <input type="password" name="password" placeholder="Mot de passe">
                </label>
            </div>

            <div>
                <input type="submit" value="S'inscrire">
            </div>
        </form>

        <NuxtLink to="/">Se connecter</NuxtLink>
    </section>
</template>