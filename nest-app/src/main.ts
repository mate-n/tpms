import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
declare const module: any
const PORT = process.env.BACKEND_PORT || 3001

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })
  await app.listen(PORT)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
