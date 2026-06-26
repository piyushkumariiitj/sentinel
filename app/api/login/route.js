export async function POST(req) {
    const { captcha } = await req.json();

    const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:new URLSearchParams({
                secret:process.env.TURNSTILE_SECRET_KEY,
                response:captcha
            })
        }
    );

    const data = await verify.json();

    if(!data.success){
        return Response.json({
            success:false,
            message:"Captcha verification failed"
        });
    }

    // Verify username & password here

    return Response.json({
        success:true
    });
}