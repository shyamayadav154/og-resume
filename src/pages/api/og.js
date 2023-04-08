import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

// Make sure the font exists in the specified path:
const font = fetch(new URL('../../assets/TYPEWR__.TTF', import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export default async function handler(req) {
  const fontData = await font;
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Job title';
    const name= searchParams.get('name') || 'Name';
    const email= searchParams.get('email') || '';
   

    return new ImageResponse(
      (
        <div tw=" h-full w-full flex justify-center items-center">
          <div tw="p-10 bg-zinc-900 relative h-full w-1/2 flex  flex-col">
            <div tw="mt-16 flex text-6xl leading-normal text-gray-200">
              Check out
            </div>
            <div tw="mt-5 flex text-6xl leading-normal text-gray-200">
             my resume
            </div>
            <div tw="mt-5 flex text-lg text-gray-300">{email}</div>

            <div tw="text-gray-300 text-5xl absolute bottom-10 left-10">
              mevvit.com
            </div>
          </div>
          <div tw="h-full bg-zinc-900 w-1/2 flex">
            <div tw="mt-24 w-full flex ">
              <div tw="rounded-tl-lg w-full px-5 flex flex-col bg-white">
                <div tw="text-4xl mt-10">{name}</div>
                <div tw="text-2xl mt-5">{title}</div>

                <div tw="h-6 mt-5 bg-gray-200 w-1/4 rounded"></div>
                <div tw="h-44 mt-2.5 bg-gray-200 rounded "></div>
                <div tw="h-6 mt-5 bg-gray-200 w-1/4 rounded"></div>
                <div tw="h-38 mt-2.5 bg-gray-200 rounded "></div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        height: 630,
        width: 1200,
        fonts: [
          {
            name: 'TypeWriter',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e) {
    console.log(e.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
