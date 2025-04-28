// import deleteFileFromFirebase from "@/app/utils/deleteFileFromFirebase";
// import { TextBlockCodes } from "@/app/utils/errorCodes";
// import { createLog } from "@/app/utils/logHelper";
// import parseErrorStack from "@/app/utils/parseErrorStack";
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Creates or updates a text block in Prisma and optionally deletes its associated file from Firebase Storage.
 * @param {NextRequest} req - The incoming HTTP PUT request containing the `key` and `value` of the text block to create or update.
 * @returns {Promise<NextResponse>} - A JSON response indicating the success or failure of the operation.
 *
 * The request body should include a single key-value pair where:
 * - `key` identifies the text block (required).
 * - `value` is the content of the text block (required and non-empty).
 *
 * Additional optional fields in the request body:
 * - `type`: The type of the text block (e.g., "text", "html").
 * - `mimeType`: The MIME type of the associated file (e.g., "image", "video").
 * - `fileName`: The name of the file in Firebase Storage to delete if updating.
 *
 * Function Behavior:
 * - If the text block with the given `key` exists:
 *   - Deletes the associated file from Firebase Storage if it exists and its MIME type is `image` or `video`.
 *   - Updates the text block with the new `value` and other optional fields.
 * - If the text block does not exist:
 *   - Creates a new text block with the provided `key`, `value`, and other optional fields.
 *
 * Example request body for creating or updating a text block:
 * {
 *   "key": "servicesPageBannerFile",
 *   "value": "https://example.com/image.jpg",
 *   "type": "image",
 *   "mimeType": "image",
 *   "fileName": "image.jpg"
 * }
 *
 * Example response on success (creation):
 * {
 *   "success": true,
 *   "message": "Text block created"
 * }
 *
 * Example response on success (update):
 * {
 *   "success": true,
 *   "message": "Text block updated"
 * }
 *
 * Example response on error:
 * {
 *   "message": "Error description",
 *   "details": "Detailed error information"
 * }
 */

const sliceName = 'textBlockApi'

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()

    // Ensure the body contains only one key-value pair and extract them
    const [key, value] = Object.entries(body)[0]

    // Ensure key and value are strings and validate that value is not empty
    if (typeof key !== 'string' || typeof value !== 'string' || !value.trim()) {
      return NextResponse.json({ message: 'Missing or invalid required fields: key and value' }, { status: 400 })
    }

    // Check if the text block with the given key exists
    const existingTextBlock = await prisma.textBlock.findUnique({
      where: { key }
    })

    if (!existingTextBlock) {
      await prisma.textBlock.create({
        data: {
          key,
          value,
          type: body.type,
          mimeType: body?.mimeType || '',
          fileName: body?.fileName || ''
        }
      })
      return NextResponse.json({ success: true, message: 'Text block created' }, { status: 201 })
    }

    // const { fileName, mimeType } = existingTextBlock;

    // if (fileName && (mimeType === "image" || mimeType === "video")) {
    //   await deleteFileFromFirebase(fileName, mimeType);
    // }

    // If the text block exists, update it
    await prisma.textBlock.update({
      where: { key },
      data: {
        value,
        type: body.type,
        mimeType: body?.mimeType || '',
        fileName: body?.fileName || ''
      }
    })

    return NextResponse.json({ key, value, type: body.type, success: true, message: 'Text block updated', sliceName }, { status: 200 })
  } catch (error: any) {
    // await createLog(
    //   "error",
    //   `Failed to update text block: ${error.message}`,
    //   "unknown",
    //   TextBlockCodes.GENERIC_SERVER_ERROR,
    //   {
    //     errorLocation: parseErrorStack(error),
    //     errorMessage: error.message,
    //     errorName: error.name || "UnknownError",
    //     timestamp: new Date().toISOString(),
    //     url: req.url,
    //     method: req.method,
    //   }
    // );
    return NextResponse.json(
      {
        message: 'Failed to update, please try again.',
        details: error.message
      },
      { status: 500 }
    )
  }
}
